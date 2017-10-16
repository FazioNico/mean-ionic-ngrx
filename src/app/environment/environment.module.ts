/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   09-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
*/

import { NgModule, ModuleWithProviders } from '@angular/core';
import { EnvVariables } from './environment.token';
import { devVariables } from './development';
import { prodVariables } from './production';
import { IEnvironment } from "./env-model";

export function environmentFactory():IEnvironment {
  //  console.log(`test ENV config dev -> ${__DEV__}`)
  //  console.log(`test ENV config prod > ${__PROD__}`)
  let env:IEnvironment = (__PROD__)? prodVariables : devVariables;
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
