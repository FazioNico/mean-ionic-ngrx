/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
*/

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
  public authSubscribtion:Subscription;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public authStore: AuthStoreService
  ) {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });

    // here we are monitoring the authstate:
    // we do a subscribe to manage state and we not unsubscribe on ionViewDidLeave()
    // cause we need to manage user state in all application to kik user in app root if is unAuthenticate.
    // Each time Login component will start, a new subscription will starting automaticly.
    // We only stop subscribtion with `.unsubscribe()` when user LOST authentication during application proccessing.
    this.authSubscribtion = this.authStore.getCurrentUser().subscribe((currentState: any) => {
      //console.log('state->', currentState)
      if (currentState) {
        if(!this.user){
          console.log('home')
          this.navCtrl.setRoot('HomePage')
        }
        // setup in memory `this.user` with current user.
        this.user = currentState;
      }
      else {
        // if we have in memory `this.user`, current user have probably LOST authentication.
        // We need to rezet `this.user` from memory cache and kik unauthenticate current user to the Login page with `.setRoot()`.
        // .setRoot() will load a new LoginPage Module with new monitoring authstate.
        // That's why we need to do `.unsubscribe()` from `this.authSubscribtion` to prevent errors.
        if(this.user){
          this.user = null
          this.navCtrl.setRoot('LoginPage')
          // do not forget to unsubscribe from all subscribtion
          // to prevent memory lag or bug.
          // User management will restart on components new LoginPage starting
          this.authSubscribtion.unsubscribe()
        }
        //console.log('login')
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
