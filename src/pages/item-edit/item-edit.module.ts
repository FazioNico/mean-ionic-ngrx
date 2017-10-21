/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-10-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEdit } from './item-edit';

import { ItemsStoreService } from '../items/store/items-store.service';
import { ItemEditI18nModule } from "./i18n/item-edit-i18n.module";

@NgModule({
  declarations: [
    ItemEdit,
  ],
  imports: [
    ItemEditI18nModule,
    IonicPageModule.forChild(ItemEdit)
  ],
  providers: [ItemsStoreService],
  exports: [ItemEdit]
})
export class ItemEditModule {}
