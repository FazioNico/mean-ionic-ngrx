/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController, Alert } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Store, Action } from '@ngrx/store'
import { AppStateI } from "../../store/app-stats";

import * as Auth from '../../store/actions/auth.actions';

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
export class Login {

  public loginBtn:boolean = true;
  public userForm:FormGroup;
  public loader:Loading;
  public errorMessage:any;

  constructor(
    public navCtrl: NavController,
    private _formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl:LoadingController,
    private store: Store<AppStateI>
  ) {
    this.userForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });
  }

  onLogin():void{
    //this.submitted = true;
    if (this.userForm.valid) {
      this.store.dispatch(new Auth.LoginAction((this.userForm.value)))
    }
  }
  onSignup():void{
    if (this.userForm.valid) {
      this.store.dispatch(new Auth.CreateAction(this.userForm.value));
    }
  }

  toggleBtn():void{
    this.loginBtn = !this.loginBtn
  }

}
