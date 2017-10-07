/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
 */

 import { NgModule, ModuleWithProviders } from '@angular/core';
 import { EnvVariables } from './environment.token';
 import { devVariables } from './development';
 import { prodVariables } from './production';
 import { IEnvironment } from "./env-model";

export declare const process: any; // Typescript compiler will complain without this

 export function environmentFactory():IEnvironment {
   //console.log('process.env.IONIC_ENV-> ', process.env.IONIC_ENV)
   //console.log('process.env-> ',  process.env.NODE_ENV)
   let env:IEnvironment = (process.env.IONIC_ENV === 'prod' || process.env.NODE_ENV === 'prod' )? prodVariables : devVariables;
   env.ionicEnvName != 'prod'? console.info('env->', env) : console.info('env->', 'Production Mode');
   return env
 }

 @NgModule({
   providers: [
     {
       provide: EnvVariables,
       useFactory: environmentFactory
     }
   ]
 })
 export class EnvironmentsModule {
   static forRoot(): ModuleWithProviders {
     return {
       ngModule: EnvironmentsModule,
       providers: [     {
              provide: EnvVariables,
              useFactory: environmentFactory
            }]
     }
   }
 }
