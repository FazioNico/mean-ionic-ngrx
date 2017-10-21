/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-10-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Items } from './items';

import { ItemsStoreModule } from "./store/items-store.module";
import { ItemsService } from "./items.service";
import { ItemsI18nModule } from "./i18n/items-i18n.module";

@NgModule({
  declarations: [
    Items,
  ],
  imports: [
    ItemsI18nModule,
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
