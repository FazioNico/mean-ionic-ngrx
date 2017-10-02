/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
*/

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { Store, Action } from '@ngrx/store'
import { AuthStoreService } from './store/auth-store.service';

/**
* Generated class for the Login page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@IonicPage({
  name: 'LoginPage',
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login implements OnInit{
  /**
   * Exemple how to use store in components with store
   */
  public user:any|null;
  public loginBtn:boolean = true;
  public userForm:FormGroup;
  public loader:Loading;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController,
    public authStore: AuthStoreService
  ) {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });

    // here we are monitoring the authstate
    this.authStore.getCurrentUser().subscribe((currentState: any) => {
      //console.log('state->', currentState)
      if (currentState) {
        if(!this.user){
          console.log('home')
          this.navCtrl.setRoot('HomePage', {'checkAuth':true})
        }
        this.user = currentState;
      }
      else {
        if(this.user){
          this.user = null
          this.navCtrl.setRoot('LoginPage')
        }
        console.log('login')
      }
    });
  }

  ngOnInit(){
    this.authStore.dispatchCheckAuthAction()
  }

  onLogin():void{
    //this.submitted = true;
    if (this.userForm.valid) {
      this.authStore.dispatchLoginAction(this.userForm.value)
    }
  }
  onSignup():void{
    if (this.userForm.valid) {
      this.authStore.dispatchCreateAction(this.userForm.value)
    }
  }

  toggleBtn():void{
    this.loginBtn = !this.loginBtn
  }

}
