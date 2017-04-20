/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user:any;
  public storeInfo:Observable<AppStateI>;

  constructor(
    public navCtrl: NavController,
    private store: Store<any>,
    private mainActions: MainActions
  ) {
    this.storeInfo = this.store.select((state:AppStateI) => state.currentUser )
  }

  goPage(page:string){
    this.navCtrl.push('ItemsPage')
  }

  onLogout():void{
    this.store.dispatch(<Action>this.mainActions.logout());
  }
}
