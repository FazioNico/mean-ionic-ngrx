/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-12-2017
*/

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as compress from 'compression';
import * as expressStatusMonitor from 'express-status-monitor';

import { GraphqlApi } from "./graphql";
import { RestApi }  from "./rest";
import { Database }  from "./databases";
import { log }  from "./log";
import { CONFIG, responseNormalizer, errorHandler } from "./config";

const PACKAGE = require("../package.json");

export class Server{
  public app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;
  public db:()=>Promise<any> = Database;

  constructor(){
    this.app = express();
  }

  init():void{
    this.server = http.createServer(this.app);
    this.config()
    this.middleware()
    this.dbConnect()
  }

  private config():void{
    // define the app.server endpoints folder
    this.root = path.join(__dirname, '../api')
    // define prot & normalize value
    this.port = this.normalizePort(process.env.PORT|| 8080);
    // use the root path defined
    this.app.use(express.static(this.root))
  }

  private middleware():void{
    // setup app middlewares
    this.app
      // use express-status-monitor to add realtime monitoring app endpoint on DEV mode.
      .use(
        (!!process.env.NODE_ENV && process.env.NODE_ENV === 'prod')
          ? (req,res,next)=> next() // not used to monitoring on PROD
          : expressStatusMonitor() // enable only on DEV
      )
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
      // secret variable for jwt
      .set('superSecret', CONFIG.secretTokent)
      // use morgan to log requests to the console
      .use(
        (!!process.env.NODE_ENV && process.env.NODE_ENV === 'test')
          ? (req,res,next)=>{
              next()
            }
          : morgan('dev')
      )
      // enable gzip compression
      .use(compress())
      // cors domaine origin
      .use(cors({ optionsSuccessStatus: 200 }))
      // use to limit repeated requests to public APIs
      .use(CONFIG.limiter)
  }

  private dbConnect():void{
      // Load DB connection
      this.db()
        .then(() =>{
          // Load all route
          // Server Endpoints
          this.defaultServerRoute()
          this.app
            // GraphQL API Endpoints
            .use( new GraphqlApi(this.server).init())
            // REST API Endpoints
            .use( new RestApi().init())
        })
        .then(_ => {
          // Then catch 404
          this.app.use((req, res)=>{
            res.status(404).json(responseNormalizer(404, null, 'Page not found'));
          })
        })
        .catch(error => {
          // DB connection Error => load only server route
          console.log(error)
          // Server Endpoints
          this.defaultServerRoute()
          this.app.use((req, res)=>{
            console.log(error)
            let data:any = (error)? [{error: 'Page not found'}, {error}] : [{error: 'Page not found'}]
            res.status(404).json(responseNormalizer(404, {error:data}, 'Page not found'));
          })
          return error
        })

  }

  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind:string = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private defaultServerRoute(){
    this.app
        .get( '/', log, (req, res) => {
          res.json(responseNormalizer(200, null, `${PACKAGE.name} - v.${PACKAGE.version} / ${PACKAGE.description} by ${PACKAGE.author}`));
        })
        .use(errorHandler)
  }

  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  bootstrap():void{
    this.server.on('error', this.onError);
    this.server.listen(this.port, (err)=>{
      if (err) {
        console.log('error occurred trying to listen on port ' + this.port);
        return;
      }
      console.log("Listnening on port " + this.port)
      // Find out which user used sudo through the environment variable
      const SUDO_UID = parseInt(process.env.SUDO_UID);
      // Set our server's uid to that user
      if (!SUDO_UID) return;
      process.setuid(SUDO_UID);
      console.log('Server\'s UID is now ' + process.getuid());
    });
  }

  close():void{
    this.server.close(res=> {
      console.log('server close', res)
    })
  }
}
