/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-04-2017
 */

 import { IEnvironment } from "./env-model";

 export const prodVariables:IEnvironment = {
   environmentName: 'Production Environment',
   ionicEnvName: 'prod',

   // Front-end
   apiEndpoint: 'https://arcane-reef-52144.herokuapp.com',

   // Back-end
   dbHost: 'mongodb://ionic_devops:porrVnMKN8FO@ds145230.mlab.com:45230',
   dbName: 'ionic_devops'
 };
