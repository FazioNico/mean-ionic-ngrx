/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-11-2017
 */

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Import RXJS as globale
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

// Import Environment Variables Module
import { EnvironmentsModule } from "./environment/environment.module";

// Import ngrx Tools
import { NgRxStoreModule } from "../store/store.module";

// Import Apollo tools
import { GraphQLModule } from "./graphql.module";
// Import i18n translate module
import { I18nModule} from "../i18n/i18n.module";

// import App entry point
import { MyApp } from './app.component';

// Define Ionic app style configuration
// for smaller final CSS bundle (PWA tips)
const ionicAppConfig:Object = {
  tabsPlacement: 'bottom',
  mode: 'md', // here we exclude from css bundle all other platform style. You've choise with: md|ios|wp
  iconMode: 'md'
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
    EnvironmentsModule.forRoot(), // import app environment variable in first.
    GraphQLModule, // import GarphQL module
    I18nModule.forRoot(), // import i18n module
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
