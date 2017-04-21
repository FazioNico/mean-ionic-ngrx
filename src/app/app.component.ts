/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

import { Component, OnInit } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { MainActions } from '../store/actions/mainActions';
import { AppStateI } from "../store/app-stats";


import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  user:any;
  rootPage:any;
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

      this.storeInfo = this.store.select((state:AppStateI) => state.currentUser)
      // here we are monitoring the authstate
      this.storeInfo.subscribe((currentState: any) => {
        if (currentState.currentUser) {
          this.user = currentState.currentUser;
          this.app.getActiveNav().setRoot(HomePage)
          // this.rootPage = HomePage;
          console.log('home')
        }
        else {
          this.app.getActiveNav().setRoot('LoginPage')
          // this.rootPage = 'LoginPage';
          console.log('login')
        }
      });
    });
  }

  ngOnInit() {
    this.rootPage = 'LoginPage';
    this.store.dispatch(this.mainActions.checkAuth());
  }
}
