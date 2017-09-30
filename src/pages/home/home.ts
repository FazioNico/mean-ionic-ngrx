/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { ICurrentUserState } from '../../store/reducers/currentUserReducer';
import * as Auth from '../../store/actions/auth.actions';

@IonicPage({
  name: 'HomePage',
  segment: 'index'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public readonly storeInfo:Observable<ICurrentUserState>;

  constructor(
    private readonly navCtrl: NavController,
    private readonly store: Store<AppStateI>,
  ) {
    this.storeInfo = this.store.select((state:AppStateI) => state.currentUser )
  }

  goPage(page:string):void{
    this.navCtrl.push('ItemsPage')
  }

  onLogout():void{
    this.store.dispatch(new Auth.LogoutAction());
  }
}
