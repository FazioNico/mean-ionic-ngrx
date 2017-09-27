/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
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
import { SharedModule } from '../../shared/shared.module';

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
  exports: [
    ItemEdit
  ]
})
export class ItemEditModule {}
