/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-10-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEdit } from './item-edit';

import { ItemsStoreService } from '../items/store/items-store.service';

@NgModule({
  declarations: [
    ItemEdit,
  ],
  imports: [
    IonicPageModule.forChild(ItemEdit)
  ],
  providers: [ItemsStoreService],
  exports: [ItemEdit]
})
export class ItemEditModule {}
