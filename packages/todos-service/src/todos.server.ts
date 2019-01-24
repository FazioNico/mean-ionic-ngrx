
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as cors from 'cors';
import * as compress from 'compression';
import * as http from 'http';
import * as os from 'os';
import { CONFIG } from './config';
import fetch from 'node-fetch';
import { tokenMiddleware } from './todos.token.middleware';

const normalizePort = (val: number|string): number => {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port) || port < 0) {
      return +process.env.PORT || 8080;
  }
  return port;
};

export class TodosServer {
  app: express.Application;
  httpServer: http.Server;
  serviceName: string;
  serverConfig: CONFIG.IServerConfig;
  middlewares?: {(req, res, next)}[] = [];

  constructor(options: {
    serverConfig: CONFIG.IServerConfig;
    serviceName: string;
  }) {
    // handle options
    Object.assign(this, options);
    // create Express server
    this.app = express();
    // add middleware to default server
    this._addMiddleware();
  }

  _addMiddleware() {
    // don't use winston for tests
    const emptyMiddleware = (req, res, next) => next();
    // setup app middlewares
    return this.app
    // use Helmet to help secure Express apps with various HTTP headers
    .use(helmet())
    // rmv server powered-by header
    .disable('x-powered-by')
    // use bodyParser middleware to decode json parameters
    .use(bodyParser.json())
    .use(bodyParser.json({limit: '50mb', type: 'application/vnd.api+json'}))
    // use bodyParser middleware to decode urlencoded parameters
    .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    // use HPP to protect against HTTP Parameter Pollution attacks
    .use(hpp())
    // use morgan to log requests to the console
    .use(
      ['production', 'prod', 'testing', 'test'].indexOf(this.serverConfig.envName) === -1
        ? morgan('dev', )
        : emptyMiddleware
    )
    // trust proxy in test env so it will use X-Forwarded-* headers
    .set('trust proxy', this.serverConfig.envName === 'test')
    // enable gzip compression
    .use(compress())
    .use(tokenMiddleware(this.serverConfig)) // FIX: tokenMiddleware
    // cors domaine origin
    .use(cors({optionsSuccessStatus: 200}))
    // use to limit repeated requests to public APIs
    .use(this.serverConfig.requestsLimiter)
    // add serverConfigBackendToken + secretToken to app
    .use((req, res, next) =>  {
      (req as any).serverConfig = {};
      (req as any).serverConfig.backendToken = this.serverConfig.backendToken;
      (req as any).serverConfig.secretTokent = this.serverConfig.secretTokent;
      (req as any).serverConfig.host = this.serverConfig.getHost();
      next();
    });
  }

  async createHttpServer(): Promise<http.Server>  {
    this.httpServer = await http.createServer(this.app);
    return this.httpServer;
  }

  async addDefaultRoute(): Promise<express.Application | Error> {
    if (!this.app) return new Error(`need a express instance to add default routes`);
    return this.app
    .get('/', (req, res) => {
      res.status(200).json({code: 200, message: `Welcome on ${this.serviceName} Microservice API`});
    })
    .get('/_debug', (req, res) => {
      console.log(`[DEBUG]: Headers:\n${JSON.stringify(req.headers, null, 2)}`);
      console.log(`[DEBUG]: Network Interfaces:\n${JSON.stringify(os.networkInterfaces(), null, 2)}`);
      console.log(`[DEBUG]: Ips:\n${req.ip} - ${JSON.stringify(req.ips, null, 2)}`);
      res.status(200).json({});
    })
    // generate 500 error code for unit testing
    .get('/500', (req, res, next) => {
      next('Internal Server Error');
    });
  }

  catchErrors(): Promise<any> {
    return Promise.resolve(
      this.app
          .use((err, req, res, next) => {
            if (err && err.code) {
              const response: any = { message: err.message || err.toString(), code: err.code || 500, stack: err.stack };
              if (this.serverConfig.verbose) console.log('[ERROR]: ', response.message, response.stack);
              return res.status(response.code).json(response);
            }
            if (this.serverConfig.verbose) {
              let errmsg = err.toString();
              if (typeof err === 'object') {
                try {
                  // use try catch in case of circular reference
                  errmsg = JSON.stringify(err, null, 2);
                }
                catch (e) { }
              }
              console.log(`[ERROR]: {SERVER} Internal Server Error: ${errmsg}`, this.serverConfig.verbose);
            }
            res.status(500).json({code: 500, data: err, message: 'Internal Server Error'});
          })
          .use((req, res, next) => {
            console.log(`[Error]: 404 API not found`, this.serverConfig.verbose);
            res.status(404).json({code: 404, message: 'API not found'});
          })
    );
  }

  protected onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = `Port ${normalizePort(this.serverConfig.port)}`;
    switch (error.code) {
      case 'EACCES':
        if (this.serverConfig.verbose)
          console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        if (this.serverConfig.verbose)
          console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  async bootstrap(): Promise<any> {
    await this.catchErrors();
    this.httpServer.on('error', this.onError);
    process.on('SIGINT', async () => {
      await this._disconnectApiGateway();
    });
    return new Promise( (resolve, reject) => {
      this.httpServer.listen(normalizePort(this.serverConfig.port), async (err) => {
        if (err) {
          if (this.serverConfig.verbose)
          console.log('[ERROR]: error occurred trying to listen on port ' + normalizePort(this.serverConfig.port), this.serverConfig.verbose);
          return reject(err);
        }
        if (this.serverConfig.verbose) {
          console.log(
            `[INFO]: Express server listening on ${this.serverConfig.getHost()}`,
            this.serverConfig.verbose
          );
          console.log(
            `[INFO]: Environment: ${this.serverConfig.envName}`,
            this.serverConfig.verbose
          );
        }
        resolve();
      });
    });
  }
  async connectApiGateway() {
    console.log('[INFO]: Send available routes to apigateway...', true);
    // build request options
    const body = {
      service: {
        label: this.serviceName.split('Module')[0].toLocaleLowerCase(),
        host: this.serverConfig.host,
        port: this.serverConfig.port
      }
    };
    const url = this.serverConfig.gateway_host + '/serviceUp';
    // console.log('send req--->', url, body);
    // do request to notify apigateway service with available routes
    const requestInit = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    };
    const sendRequest: Response = await fetch(
      url,
      requestInit
    )
    .catch(err => (console.log('[ERROR]: ', err), err));
    let response;
    const { status = null} = sendRequest;
    if (status && status === 200) {
      console.log('[INFO]: Request to apigatway respond with success', true);
      response = (await sendRequest.json());
      return response;
    }
    console.log('[INFO]: Request to apigatway respond with error', true);
    return Promise.reject('[ERROR]: unable to request apigateway');
  }

  async _disconnectApiGateway() {
    console.log('[INFO]: Send disabled routes to apigateway...', true);
    // build request options
    const body = {
      service: {
        label: this.serviceName.split('Module')[0].toLocaleLowerCase()
      }
    };
    const url = this.serverConfig.gateway_host + '/serviceDown';
    console.log('send req--->', url, body);
    // do request to notify apigateway service with available routes
    const sendRequest = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    let response;
    const { status = null } = sendRequest;
    console.log('status---->', status);
    if (status && status === 200) {
      console.log('[INFO]: Request to apigatway respond with success', true);
      response = (await sendRequest.json());
      return response;
    }
    console.log('[INFO]: Request to apigatway respond with error', true);
    console.log('err--->', await sendRequest.json());
    return Promise.reject('[error]: unable to request apigateway');
  }

  close(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpServer.close(_ => resolve());
    });
  }

}