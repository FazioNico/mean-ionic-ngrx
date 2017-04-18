/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-04-2017
 */

import { Component, OnInit } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { MainActions } from '../store/actions/mainActions';
import { AppStateI } from "../store/app-stats";


import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  user:any;
  rootPage:any = Login;
  public storeInfo:Observable<AppStateI>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<any>,
    private mainActions: MainActions,
    public app: App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storeInfo = this.store.select(state => state.currentUser)
      // here we are monitoring the authstate to do initial load of data
      this.storeInfo.subscribe((currentState: any) => {
        if (currentState.currentUser) {
          this.user = currentState.currentUser;
          console.log('currentUser->', currentState.currentUser)
          this.app.getActiveNav().setRoot(HomePage)
        }
      });
    });
  }

  ngOnInit() {
    this.store.dispatch(this.mainActions.checkAuth());
  }
}
