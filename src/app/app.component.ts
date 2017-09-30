/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-09-2017
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../store/app-stats";
import * as Auth from '../store/actions/auth.actions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  public user:any|null;
  public rootPage:string = "LoginPage";
  public storeInfo:Observable<AppStateI>;
  public loadingSpinner:Loading;
  @ViewChild(Nav) nav:Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<any>,
    public loadingCtrl: LoadingController,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storeInfo = this.store.select((state:AppStateI) => state.currentUser)
      // here we are monitoring the authstate
      this.storeInfo.subscribe((currentState: any) => {
        //console.log('state->', currentState)
        if (currentState) {
          if(!this.user){
            console.log('home')
            this.nav.setRoot('HomePage')
          }
          this.user = currentState;
        }
        else {
          this.user = null
          this.nav.setRoot('LoginPage')
          console.log('login')
        }
      });
    });
  }

  ngOnInit():void {
    this.rootPage = 'LoginPage';
    this.store.dispatch(new Auth.CheckAuthAction());
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
