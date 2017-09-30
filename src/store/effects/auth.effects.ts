/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import * as Auth from '../actions/auth.actions';
 import { AuthService } from "../../providers/auth-service/auth.service";
 import { Response } from '@angular/http';

 @Injectable()
 export class AuthEffects {

   constructor(
     private action$: Actions,
     private _auth: AuthService
   ) {
   }

   @Effect() loginAction$ = this.action$
       .ofType(Auth.AuthActions.LOGIN)
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.doAuth(payload))
       .switchMap((result:any)=> {
         if(result.success === true){
           return Observable.of(new Auth.LoginSuccessAction(result))
         }
         else {
           return Observable.of(new Auth.ErrorAction(result))
         }
       })


   @Effect() checkMainAction$ = this.action$
       .ofType(Auth.AuthActions.CHECK_AUTH)
       .switchMap<Action, Observable<any>>(() =>  this._auth.isAuth())
       .switchMap<Observable<any>, Observable<Action>>((_result:any) => {
         console.log('CHECK_AUTH -->',_result)
         if (_result._id) {
           return Observable.of(new Auth.CheckAuthSuccessAction(_result))
         } else {
           return Observable.of(new Auth.CheckAuthNoUserSuccessAction())
         }
       })
       .catch((res: any) => Observable.of(new Auth.ErrorAction(res)))


   @Effect() logoutAction$ = this.action$
       .ofType(Auth.AuthActions.LOGOUT)
       .switchMap<Action, any>(() => this._auth.doLogout())
       // If successful, dispatch success action
       .switchMap<Action, any>(action =>Observable.concat(
          Observable.of(new Auth.TokenDeleteAction()),
          Observable.of(new Auth.LogoutSuccessAction())
       ))
       // If request fails, dispatch failed action
       .catch((err: any) => Observable.of(new Auth.ErrorAction))


   @Effect() createUserAction$ = this.action$
       .ofType(Auth.AuthActions.CREATE)
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.doCreateUser(payload))
       .switchMap((_result:any) => {
         //console.log('-->',_result)
         if(_result.success === true){
           return Observable.of(new Auth.CreateSuccessAction(_result))
         }
         else {
           return Observable.of(new Auth.ErrorAction(_result))
         }
       })
       .catch((err: any) => Observable.of(new Auth.ErrorAction(err.message)))


   @Effect() userSuccessAction$ = this.action$
       .ofType(
         Auth.AuthActions.CREATE_SUCCESS,
         Auth.AuthActions.LOGIN_SUCCESS
       )
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.saveToken(payload))
       .switchMap<any, any>(payload =>{
         //console.log('-->',payload)
         if(payload){

           return Observable.concat(
            Observable.of(new Auth.TokenSaveSuccessAction(payload)),
            Observable.of(new Auth.CheckAuthAction())
           )
         }
         else {
          return Observable.of(new Auth.ErrorAction())
         }
       })
       .catch((err: any) => Observable.of(new Auth.ErrorAction(err.message)))

 }
