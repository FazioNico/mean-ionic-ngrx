/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
 */

 import { InjectionToken } from "@angular/core";
 import { IEnvironment } from "./env-model";

 export let EnvVariables = new InjectionToken<IEnvironment>("env.variables");
