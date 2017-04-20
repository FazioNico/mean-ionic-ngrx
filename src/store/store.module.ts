/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import ngRx Store
import { reducer } from '../store/reducers';
import { AuthEffects } from '../store/effects/authEffects';
import { DatasEffects } from '../store/effects/datasEffects';
import { ErrorEffects } from '../store/effects/errorEffects';

import { MainActions } from '../store/actions/mainActions';

// Import Providers Service
import { DatasService } from "../providers/datas-service/datas-service";
import { AuthService } from "../providers/auth-service/auth-service";
import { AlertService } from "../providers/alert-service/alert-service";

const providers:Array<any> =  [
    DatasService,
    AuthService,
    AlertService,
];
const effects:Array<any> = [
    AuthEffects,
    DatasEffects,
    ErrorEffects
];
const actions:Array<any> = [
    MainActions
];

/*
  Bootstrap NgModule
*/
@NgModule({
  imports: [
    HttpModule,
    EffectsModule.runAfterBootstrap(AuthEffects),
    EffectsModule.runAfterBootstrap(DatasEffects),
    EffectsModule.runAfterBootstrap(ErrorEffects),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [...providers, ...effects, ...actions]
})
export class NgRxStoreModule {}
