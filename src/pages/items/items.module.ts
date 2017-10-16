/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Items } from './items';

import { ItemsStoreModule } from "./store/items-store.module";
import { ItemsService } from "./items.service";

@NgModule({
  declarations: [
    Items,
  ],
  imports: [
    ItemsStoreModule,
    IonicPageModule.forChild(Items),
  ],
  providers: [
    ItemsService
  ],
  exports: [
    Items
  ]
})
export class ItemsModule {}
