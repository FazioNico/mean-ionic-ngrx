/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 28-09-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEdit } from './item-edit';

// Import ngrx Tools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from "../items/store/items.reducer";
import { DatasEffects } from "../../shared/store/datas.effects";
// import { ItemsActions } from "./store/items.actions";

//mimport { ItemsService } from "./store/items.service";
import { ItemsStoreService } from '../items/store/items-store.service';

@NgModule({
  declarations: [
    ItemEdit,
  ],
  imports: [
    //SharedModule,//.forRoot(),
    IonicPageModule.forChild(ItemEdit),
    //StoreModule.forFeature('dataArray', reducer), // Define dataArray reducer
    //StoreDevtoolsModule.instrument(),
    //EffectsModule.forFeature([DatasEffects]), // Define datasEffects
  ],
  providers: [ItemsStoreService],
  exports: [
    ItemEdit
  ]
})
export class ItemEditModule {}
