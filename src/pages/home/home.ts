/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 06-10-2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { AuthStoreService } from '../login/store/auth-store.service';
import { ICurrentUserState } from '../login/store/currentUser.reducer';

@IonicPage({
  name: 'HomePage',
  segment: 'index'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
/**
 * Exemple how to use store in components without store
 */
  public readonly storeInfo:Observable<ICurrentUserState>;

  constructor(
    private readonly navCtrl: NavController,
    private readonly navParams: NavParams,
    private readonly authStore:AuthStoreService,
  ) {
    // add this to all page need to be login
    if(!this.navParams.get('checkAuth')){
      this.navCtrl.setRoot('LoginPage')
      return
    }
    // manage store state
    this.storeInfo = this.authStore.getCurrentUser()
  }

  goPage(page:string):void{
    this.navCtrl.push('ItemsPage')
  }

  onLogout():void{
    this.authStore.dispatchLogoutAction()
  }
}
