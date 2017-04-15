/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-04-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Items } from './items';

@NgModule({
  declarations: [
    Items,
  ],
  imports: [
    IonicPageModule.forChild(Items),
  ],
  exports: [
    Items
  ]
})
export class ItemsModule {}
