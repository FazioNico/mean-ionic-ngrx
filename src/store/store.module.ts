/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
*/

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import ngRx Store
import { reducer, metaReducers } from '../store/reducers';
import { ErrorEffects } from '../store/effects/errorEffects';

// Import Providers Service
import { AlertService } from "../providers/alert-service/alert-service";

// (Optional): import auth-store.service to enable Login on rootPage
import { AuthStoreService } from '../pages/login/store/auth-store.service';

const providers:Array<any> =  [
    AlertService,
    AuthStoreService
];
const effects:Array<any> = [
    ErrorEffects
];

/*
  Bootstrap NgRxStoreModule
  with default root store state & reducer & effects
  => rest of store will be loaded with lazy loading ;-)
*/
@NgModule({
  imports: [
    HttpModule,
    StoreModule.forRoot(reducer, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([...effects]),
  ],
  providers: [...providers, ...effects]
})
export class NgRxStoreModule {
  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgRxStoreModule,
      providers: [...providers, ...effects]
    }
  }
}
