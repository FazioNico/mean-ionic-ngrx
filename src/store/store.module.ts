/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import ngRx Store
import { reducer } from '../store/reducers';
import { AuthEffects } from '../store/effects/auth.effects';
import { ErrorEffects } from '../store/effects/errorEffects';

import { AuthActions } from '../store/actions/auth.actions';
import { MainActions } from '../store/actions/mainActions';

// Import Providers Service
import { AuthService } from "../providers/auth-service/auth.service";
import { AlertService } from "../providers/alert-service/alert-service";

const providers:Array<any> =  [
    AuthService,
    AlertService,
];
const effects:Array<any> = [
    AuthEffects,
    ErrorEffects
];
const actions:Array<any> = [
    AuthActions,
    MainActions,
];

/*
  Bootstrap NgRxStoreModule
  with default root store state & reducer & effects
  => rest of store will be loaded with lazy loading ;-)
*/
@NgModule({
  imports: [
    HttpModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([...effects]),
  ],
  providers: [...providers, ...effects, ...actions]
})
export class NgRxStoreModule {
  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgRxStoreModule,
      providers: [...providers, ...effects, ...actions]
    }
  }
}
