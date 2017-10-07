/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
 */

 import { IEnvironment } from "./env-model";

 export const prodVariables:IEnvironment = {
   environmentName: 'Production Environment',
   ionicEnvName: 'prod',

   // TODO: Change wuth your own prod environment variable
   // Front-end
   apiEndpoint: 'http://localhost:8080',
 };
