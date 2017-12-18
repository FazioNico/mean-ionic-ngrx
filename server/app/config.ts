/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-12-2017
*/


import * as RateLimit from 'express-rate-limit';
import { devVariables } from './environment/development';
import { prodVariables } from './environment/production';
import { IEnvironment } from './environment/env-model';


declare const process: any; // Typescript compiler will complain without this

export function environmentConfig():any {
  let env = devVariables;
  if(process.env.NODE_ENV === 'prod'){env = prodVariables}
  return env;
}

export interface IConfig {
  server:{
    PORT:number
  },
  database:{
    HOST:string
  },
  secretTokent:string,
  jwtExpire:number,
  bcryptRound:number,
  passwordMinLenght:number,
  limiter:RateLimit
}

export const CONFIG:IConfig = {
	server: {
		PORT: +process.env.PORT || 8080,
	},
	database: {
		HOST: process.env.MONGODB || `${environmentConfig().dbHost}/${environmentConfig().dbName}`
	},
	secretTokent: 'this is a bad secret sentence',
	jwtExpire: 86400000,
	bcryptRound: 10,
	passwordMinLenght: 6,
  limiter : new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  })
};
