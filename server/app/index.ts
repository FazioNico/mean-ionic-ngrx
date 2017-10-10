/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/

/// <reference path="./@types/index.d.ts" />

import * as express from 'express';
import * as http  from "http";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';
import * as morgan from 'morgan';

import { GraphqlApi } from "./graphql";
import { RestApi }  from "./rest/apiRoute";
import { DataBase }  from "./databases/mongoose";
import { log }  from "./log";
// Import secretTokenKey config
import { CONFIG } from "./config";

const PACKAGE = require("../package.json");

export class Server{

  private app:express.Application;
  private server:http.Server;
  private root:string;
  private port:number|string|boolean;


  constructor(){
    this.app = express();
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

  private middleware(){
    this.app
      // use bodyParser middleware to decode json parameters
      .use(bodyParser.json())
      .use(bodyParser.json({limit: '50mb', type: 'application/vnd.api+json'}))
      // use bodyParser middleware to decode urlencoded parameters
      .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
      // secret variable for jwt
      .set('superSecret', CONFIG.secretTokent)
      // use morgan to log requests to the console
      .use(morgan('dev'))
      // cors domaine origin
      .use(cors({ optionsSuccessStatus: 200 }))
  }

  private dbConnect(){
      // Load DB connection
      DataBase.connect()
        .then(() =>{
          // Load all route
          // Server Endpoints
          this.defaultServerRoute()
          // GraphQL API Endpoints
          this.app.use( new GraphqlApi(this.server).init());
          // REST API Endpoints
          this.app.use( new RestApi().init());
        })
        .catch(error => {
          // DB connection Error => load only server route
          console.log(error)
          // Server Endpoints
          this.defaultServerRoute()
          return error
        })
        .then(error => {
          // Then catch 404 & db error connection
          this.app.use((req, res)=>{
            console.log(error)
            let message:any[] = (error)? [{error: 'Page not found'}, {error}] : [{error: 'Page not found'}]
            res.status(404).json(message);
          })
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
    this.app.get( '/', log, (req, res) => {
      res.json({
        code: 200,
        message: `${PACKAGE.name} - v.${PACKAGE.version} / ${PACKAGE.description} by ${PACKAGE.author}`
      });
    });
  }

  normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  bootstrap():void{
    this.server.on('error', this.onError);
    this.server.listen(this.port, ()=>{
    	console.log("Listnening on port " + this.port)
    });
  }

}
