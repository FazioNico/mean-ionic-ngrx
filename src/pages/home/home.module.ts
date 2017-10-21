/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   25-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-10-2017
 */

 import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { HomePage } from './home';
 import { HomeI18nModule } from "./i18n/home-i18n.module";

 @NgModule({
   declarations: [
     HomePage,
   ],
   imports: [
     HomeI18nModule,
     IonicPageModule.forChild(HomePage),
   ],
   exports: [
     HomePage
   ]
 })
 export class HomeModule {}
