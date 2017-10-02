/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../store/app-stats";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  public rootPage:string;
  public storeInfo:Observable<AppStateI>;
  public loadingSpinner:Loading;
  @ViewChild(Nav) nav:Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<AppStateI>,
    public loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit():void {
    this.rootPage = 'LoginPage';
    // manage loading spinner
    this.store.select((state:AppStateI) => state.loading)
              .subscribe(state => (state)? this.displayLoader() : this.dismissLoader())
  }

  displayLoader(){
    if(this.loadingSpinner) return;
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'loading datas...'
    });
    this.loadingSpinner.present();
  }

  dismissLoader(){
    if(!this.loadingSpinner) return;
    this.loadingSpinner.dismiss();
  }

}
