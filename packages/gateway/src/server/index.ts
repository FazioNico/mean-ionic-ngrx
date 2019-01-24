import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as hpp from 'hpp';
import * as cors from 'cors';
import * as compress from 'compression';
import * as http from 'http';


import { defaultRoutes, proxyRoutes, discoverRoute } from '../router';

export const start = async (options): Promise<{server: http.Server}> => {
  if (!options.repo) {
    Promise.reject(new Error('The server must be started with a connected repository'));
  }
  if (!options.serverConfig.port) {
    Promise.reject(new Error('The server must be started with an available port'));
  }

  const corsOptions = {
    origin:  (origin, callback) => {
      callback(null, true);
    },
    optionsSuccessStatus: 200
  };
  const app: express.Application = express()
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
    .use((!!process.env.NODE_ENV && process.env.NODE_ENV === 'test')
        ? (req, res, next) => next()
        : morgan('dev')
    )
    // enable gzip compression
    .use(compress())
    // cors domaine origin
    .use(cors(corsOptions))
    // add serverConfigBackendToken + secretToken to app
    .use((req, res, next) =>  {
      (req as any).serverConfig = {};
      (req as any).serverConfig.backendToken = options.serverConfig.backendToken;
      next();
    })
    // add default routes with error handler
    .use('/', defaultRoutes())
    // enable microservice discoverer routes service
    .use('/', discoverRoute(options))
    // add microservice proxy routes
    .use('/', proxyRoutes(options));
    // handle Express error
    await catchErrors(app, options);
    // create server
    const server = await app.listen(options.serverConfig.port, () => Promise.resolve(server));
    return {server};
};

export const catchErrors = (app, option): Promise<any> => {
  return Promise.resolve(
    app.use((err, req, res, next) => {
          if (err && err.code) {
            const response: any = { message: err.message || err.toString(), code: err.code || 500, stack: err.stack };
            console.log(response.message, option.serverConfig.verbose);
            return res.status(response.code).json(response);
          }
          if (option.serverConfig.verbose) {
            let errmsg = err.toString();
            if (typeof err === 'object') {
              try {
                // use try catch in case of circular reference
                errmsg = JSON.stringify(err, null, 2);
              }
              catch (e) { }
            }
            console.log(`[ERROR]: {SERVER} Internal Server Error: ${errmsg}`, option.serverConfig.verbose);
          }
          res.status(500).json({code: 500, data: err, message: 'Internal Server Error'});
        })
        .use((req, res, next) => {
          console.log(`[Error]: 404 API not found`, option.serverConfig.verbose);
          res.status(404).json({code: 404, message: 'API not found'});
        })
  );
};