/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public storeInfo:Observable<AppStateI>;

  constructor(
    public navCtrl: NavController,
    private store: Store<any>
  ) {
    this.storeInfo = this.store.select((state:AppStateI) => state.currentUser )
  }

  goPage(page:string){
    this.navCtrl.push('ItemsPage')
  }
}
