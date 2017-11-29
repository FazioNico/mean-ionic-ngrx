/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 28-11-2017
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, Loading, LoadingController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';

import { AppStateI } from "../store/app-stats";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  public rootPage:string;
  public loadingSpinner:Loading;
  @ViewChild(Nav) nav:Nav;

  constructor(
    public app:App,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
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

  displayLoader():void{
    if(this.loadingSpinner) return;
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'loading datas...'
    });
    this.loadingSpinner.present();
  }

  dismissLoader():void{
    if(!this.loadingSpinner) return;
    this.loadingSpinner.dismiss();
    this.loadingSpinner = null
  }

}
