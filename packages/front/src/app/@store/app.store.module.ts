import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
// import { CustomSerializer } from '@app/@store/app.state';
import { ErrorsEffects } from './effects/err.effect';

// add core providers here
const providers: any[] = [
  // { provide: RouterStateSerializer, useClass: CustomSerializer }
];
// add core effect here
const effects: any[] = [
  ErrorsEffects
];

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(AppReducers, { metaReducers }),
    EffectsModule.forRoot([...effects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class NgRxStoreModule {
  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgRxStoreModule,
      providers: [...(!environment.production ? providers : []), ...effects]
    };
  }
}
