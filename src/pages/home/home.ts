/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-10-2017
*/

import { Component, Injector, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { AuthStoreService } from '../login/store/auth-store.service';
import { ICurrentUserState } from '../login/store/currentUser.reducer';
import { canEnterIfAuthenticated } from '../../decorators';

@canEnterIfAuthenticated
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
 * Exemple how to use store in components without attached store
 */
  public readonly storeInfo:Observable<ICurrentUserState>;

  constructor(
    private readonly navCtrl: NavController,
    @Inject(AuthStoreService) private readonly authStore:AuthStoreService,
    public injector: Injector // required to use @canEnterIfAuthenticated
  ) {
    // manage store state
    this.storeInfo = this.authStore.getCurrentUser()
  }

  goPage(page:string):void{
    console.log('page->',page)
    this.navCtrl.push('ItemsPage')
  }

  onLogout():void{
    this.authStore.dispatchLogoutAction()
  }
}
