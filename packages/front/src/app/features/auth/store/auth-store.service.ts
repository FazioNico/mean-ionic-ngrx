import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppStoreService } from '@app/@store/app.store.service';
import { AppState } from '@app/@store/app.state';
import * as auth from './auth.actions';
import { IAuthState } from './auth.reducer';
import { ICurrentUserState } from './currentUser.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthStoreService extends AppStoreService {

  protected STATE = 'currentUser';

  constructor(
    protected store: Store<AppState>
  ) { super(); }


  dispatchCheckAuthAction(): void {
    this.dispatchAction(new auth.CheckAuthAction());
  }

  dispatchLoginAction(record: any): void {
    this.dispatchAction(new auth.LoginAction(record));
  }

  dispatchLogoutAction(): void {
    this.dispatchAction(new auth.LogoutAction());
  }

  dispatchCreateAction(record: any)  {
    this.dispatchAction(new auth.CreateAction(record));
  }

  dispatchTokenSaveAction(): void {
    this.dispatchAction(new auth.TokenSaveAction());
  }

  dispatchTokenDeleteAction(): void {
    this.dispatchAction(new auth.TokenDeleteAction());
  }

  // prevent error implementation of unused methodes
  dispatchLoadAction(params: {path: string}): void {}
  dispatchUpdateAction(record: any): void {}
  dispatchRemoveAction(id: string|number): void {}

  // Accessor sample of how to select piece of the state
  getCurrentUser(): Observable<ICurrentUserState> {
    this.STATE = 'currentUser';
    return this.storeSelectFeatureState().pipe(
      map((state: ICurrentUserState) => state)
    );
  }

  getAuthCheck(): Observable<IAuthState> {
    this.STATE = 'authCheck';
    return this.storeSelectFeatureState().pipe(
      map((state: IAuthState) => {
        return state;
      })
    );
  }
  isAuthenticated(): IAuthState {
    let isAuthenticated: IAuthState = false ;
    this.getAuthCheck().subscribe(isAuth => isAuthenticated = isAuth);
    return isAuthenticated  ;
  }
}
