/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, Nav, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

//import { AuthActions } from '../pages/login/store/actions/auth.actions';
import { AppStateI } from "../store/app-stats";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  public user:any|null;
  public rootPage:any;
  public storeInfo:Observable<AppStateI>;
  public loader:Loading;
  @ViewChild(Nav) nav:Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private store: Store<any>,
    //private authActions: AuthActions,
    public alertCtrl: AlertController,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storeInfo = this.store.select((state:AppStateI) => state.currentUser)
      // here we are monitoring the authstate
      this.storeInfo.subscribe((currentState: any) => {
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

  ngOnInit() {
    this.rootPage = 'LoginPage';
    this.store.dispatch(
      {
        type: 'CHECK_AUTH',
      }
      //this.authActions.checkAuth()
    );
  }

  // TODO subscrib to error reducers
  // and remove error effects
  /* ErrorHandler Methode */
  showError(text:string,hideLoading:boolean=true):void {
    if (hideLoading === true){
      setTimeout(() => {
        this.loader.dismiss();
      });
    }
    let alert:Alert = this.alertCtrl.create({
      title: 'Erreur',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
