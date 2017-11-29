/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-11-2017
 */

 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs/Observable';

 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import * as Auth from './auth.actions';
 import { LoginService } from "../login.service";

 @Injectable()
 export class AuthEffects {

   constructor(
     private action$: Actions,
     private _auth: LoginService
   ) {
   }

   @Effect() loginAction$ = this.action$
       .ofType(Auth.AuthActions.LOGIN)
       .map(toPayload)
       .switchMap((payload:any) => this._auth.doAuth(payload))
       .switchMap(result=>
          (result.success === true)
            ? Observable.of(new Auth.LoginSuccessAction(result))
            : Observable.of(new Auth.ErrorAction(result))
        )


   @Effect() checkMainAction$ = this.action$
       .ofType(Auth.AuthActions.CHECK_AUTH)
       .switchMap(_ =>this._auth.isAuth())
       .switchMap(res =>
              (res._id)
                ? Observable.of(new Auth.CheckAuthSuccessAction(res))
                : Observable.of(new Auth.CheckAuthNoUserSuccessAction())
       )
       .catch((res: any) => Observable.of(new Auth.ErrorAction(res)))


   @Effect() logoutAction$ = this.action$
       .ofType(Auth.AuthActions.LOGOUT)
       .switchMap(() => this._auth.doLogout())
       // If successful, dispatch success action

       .switchMap(action =>Observable.concat(
          Observable.of(new Auth.TokenDeleteAction()),
          Observable.of(new Auth.LogoutSuccessAction())
       ))
       // If request fails, dispatch failed action
       .catch((err: any) => Observable.of(new Auth.ErrorAction))


   @Effect() createUserAction$ = this.action$
       .ofType(Auth.AuthActions.CREATE)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => this._auth.doCreateUser(payload))
       .switchMap(_result =>
          (_result.success === true)
            ? Observable.of(new Auth.CreateSuccessAction(_result))
            : Observable.of(new Auth.ErrorAction(_result))
        )
       .catch((err: any) => Observable.of(new Auth.ErrorAction(err)))


   @Effect() userSuccessAction$ = this.action$
       .ofType(
         Auth.AuthActions.CREATE_SUCCESS,
         Auth.AuthActions.LOGIN_SUCCESS
       )
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.saveToken(payload))
       .switchMap<any, any>(payload =>
          (payload)
            ? Observable.concat(
                Observable.of(new Auth.TokenSaveSuccessAction(payload)),
                Observable.of(new Auth.CheckAuthAction())
              )
            : Observable.of(new Auth.ErrorAction())
       )
       .catch((err: any) => Observable.of(new Auth.ErrorAction(err.message)))

 }
