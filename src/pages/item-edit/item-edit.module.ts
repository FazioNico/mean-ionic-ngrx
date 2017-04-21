/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-04-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemEdit } from './item-edit';

@NgModule({
  declarations: [
    ItemEdit,
  ],
  imports: [
    IonicPageModule.forChild(ItemEdit),
  ],
  exports: [
    ItemEdit
  ]
})
export class ItemEditModule {}
