/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   26-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { NgModule, ModuleWithProviders } from '@angular/core';

import { DatasActions } from "./store/datas.actions";
import { DatasEffects } from "./store/datas.effects";
import { DatasService } from "./services/datas.service";

/**
* Module with
* - shared store actions
* - shared store services
*/
@NgModule({
  providers: [
    // DatasActions,
    // DatasEffects,
    // DatasService
  ]
})
export class SharedModule {
  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DatasActions,
        DatasEffects,
        DatasService
      ]
    }
  }
}
