/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   30-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
*/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';

import { StoreService } from '../../../store/store.service';
import { AppStateI } from '../../../store/app-stats';
import * as auth from './auth.actions';
import { IAuthCheckedState } from "./authChecked.reducer";
import { ICurrentUserState } from "./currentUser.reducer";

@Injectable()
export class AuthStoreService extends StoreService {

  protected STATE = 'currentUser';

  constructor(
    protected store: Store<AppStateI>
  ) { super() }


  dispatchCheckAuthAction() {
    this.dispatchAction(new auth.CheckAuthAction());
  }

  dispatchLoginAction(record: any) {
    this.dispatchAction(new auth.LoginAction(record));
  }

  dispatchLogoutAction() {
    this.dispatchAction(new auth.LogoutAction());
  }

  dispatchCreateAction(record: any)  {
    this.dispatchAction(new auth.CreateAction(record));
  }

  dispatchTokenSaveAction() {
    this.dispatchAction(new auth.TokenSaveAction());
  }

  dispatchTokenDeleteAction() {
    this.dispatchAction(new auth.TokenDeleteAction());
  }

  // prevent error implementation
  dispatchLoadAction(params:{path:string}):void{}
  dispatchUpdateAction(record:any):void{}
  dispatchRemoveAction(id:string|number):void{}

  // Accessor sample of how to select piece of the state
  getCurrentUser() {
    this.STATE = 'currentUser'
    return this.storeSelectFeatureState()
    .map((state: ICurrentUserState) => state);
  }

  getAuthCheck(){
    this.STATE = 'authChecked'
    return this.storeSelectFeatureState()
    .map((state: IAuthCheckedState) => state);
  }

}
