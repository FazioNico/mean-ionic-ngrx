/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   25-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 25-09-2017
 */

 import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { HomePage } from './home';

 @NgModule({
   declarations: [
     HomePage,
   ],
   imports: [
     IonicPageModule.forChild(HomePage),
   ],
   exports: [
     HomePage
   ]
 })
 export class HomeModule {}
