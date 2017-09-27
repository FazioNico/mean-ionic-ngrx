/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Items } from './items';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from "./store/items.reducer";
import { DatasEffects } from "../../shared/store/datas.effects";
// import { ItemsActions } from "./store/items.actions";

//mimport { ItemsService } from "./store/items.service";
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    Items,
  ],
  imports: [
    SharedModule,//.forRoot(), // to use datas.service + datas.action
    IonicPageModule.forChild(Items),
    StoreModule.forFeature('dataArray', reducer), // Define dataArray reducer
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([DatasEffects]), // Define datasEffects
  ],
  exports: [
    Items
  ]
})
export class ItemsModule {}
