/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
*/

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Import ngRx Store
import { reducer } from '../store/reducers';
import { MainEffects } from '../store/effects/mainEffects';
import { MainActions } from '../store/actions/mainActions';

// Import Providers Service
import { DatasService } from "../providers/datas-service/datas-service";

@NgModule({
  imports: [
    HttpModule,
    EffectsModule.runAfterBootstrap(MainEffects),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  providers: [
    DatasService,
    MainActions,
    MainEffects
  ]
})
export class NgRxStoreModule {}
