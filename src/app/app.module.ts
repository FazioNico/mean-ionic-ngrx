/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
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

// Import Apollo tools
import { ApolloModule } from 'apollo-angular';
import { provideClient } from "./apollo.client";

// import App entry point
import { MyApp } from './app.component';

// Define Ionic app style configuration
// for smaller final CSS bundle (PWA tips)
const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md' // here we exclude from css bundle all other platform style. You've choise with: md|ios|wp
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    // Only import modules need running from root app !!
    // Cause each imported module will be bootstraped
    // with main.js application file => no lazyloading.
    BrowserModule,
    EnvironmentsModule.forRoot(), // import app environment variable
    ApolloModule.forRoot(provideClient), // import apollo from root app with provided Client.
    NgRxStoreModule.forRoot(), // import AppCore NgRxStoreModule
    IonicModule.forRoot(MyApp, ionicAppConfig) // wrap Ionic app configuration
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    // no more providers to define in root app.
    // Use new module if you need a other provider.
    // Lazy loading way ;-)
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
