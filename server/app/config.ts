/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-04-2017
*/

export const devVariables:any = {
  environmentName: 'Development Environment',
  serverEnvName: 'dev',
  // Back-end
  dbHost: 'mongodb://localhost:27017',
  dbName: 'test'
};


declare const process: any; // Typescript compiler will complain without this

export function environmentConfig():any {
  let env = devVariables;
  // if(process.env.NODE_ENV === 'pre-prod'){env = prodVariables}
  return env;
}

export const SECRET_TOKEN_KEY: string = 'this is a bad secret sentence';
export const DB_NAME: string = environmentConfig().dbName;
export const DB_HOST: string = environmentConfig().dbHost;
export const BCRYPT_ROUND: number = 10;
export const PASSWORD_MIN_LENGHT: number = 6;
export const JWT_EXPIRE: number = 86400000;
