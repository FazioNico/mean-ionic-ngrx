/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Import Environment Variables Module
import { EnvironmentsModule } from "./environment/environment.module";

// Import ngrx Tools
import { NgRxStoreModule } from "../store/store.module";

// import App & RootPage
import { MyApp } from './app.component';

const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md'
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    EnvironmentsModule.forRoot(), // import app environment variable
    NgRxStoreModule.forRoot(), // import AppCore NgRxStoreModule
    IonicModule.forRoot(MyApp, ionicAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
