/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import { AuthActions } from '../actions/auth.actions';
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
       .ofType(AuthActions.LOGIN)
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.doAuth(payload))
       .switchMap((result:any)=> {
         if(result.success === true){
           return Observable.of({ type: AuthActions.LOGIN_SUCCESS, payload: result })
         }
         else {
           return Observable.of({ type: AuthActions.LOGIN_FAILED, payload: result.message })
         }
       })

   @Effect() checkMainAction$ = this.action$
       // Listen for the 'CHECK_AUTH' action
       .ofType(AuthActions.CHECK_AUTH)
       .switchMap<Action, Observable<any>>(() =>  this._auth.isAuth())
       .switchMap<Observable<any>, Observable<Action>>((_result:any) => {
         console.log('CHECK_AUTH -->',_result)
         if (_result._id) {
           return Observable.of({ type: AuthActions.CHECK_AUTH_SUCCESS, payload: _result })
         } else {
           return Observable.of({ type: AuthActions.CHECK_AUTH_NO_USER })
         }
       })
       .catch((res: any) => {
         console.log('catch -->', res)
         return Observable.of({ type: AuthActions.CHECK_AUTH_FAILED, payload: res })
       })

   @Effect() logoutAction$ = this.action$
       .ofType(AuthActions.LOGOUT)
       .switchMap<Action, any>(() => this._auth.doLogout())
       // If successful, dispatch success action
       .switchMap<Action, any>(action =>Observable.concat(
           Observable.of(<Action>{ type: AuthActions.TOKEN_DELETE }),
           Observable.of(<Action>{type: AuthActions.LOGOUT_SUCCESS })
       ))
       // If request fails, dispatch failed action
       .catch((err: any) => Observable.of({ type: AuthActions.LOGOUT_FAILED, payload: err }))

   @Effect() createUserAction$ = this.action$
       .ofType(AuthActions.CREATE_USER)
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.doCreateUser(payload))
       .switchMap((_result:any) => {
         //console.log('-->',_result)
         if(_result.success === true){
           return Observable.of({ type: AuthActions.CREATE_USER_SUCCESS, payload: _result })
         }
         else {
           return Observable.of({ type: AuthActions.CREATE_USER_FAILED, payload: _result.message })
         }
       })
       .catch((err: any) => Observable.of({ type: AuthActions.CREATE_USER_FAILED, payload: err.message }))

   // TODO
   @Effect() userSuccessAction$ = this.action$
       // Listen for the 'LOGIN_SUCCESS & CREATE_USER_SUCCESS' action
       .ofType(
         AuthActions.CREATE_USER_SUCCESS,
         AuthActions.LOGIN_SUCCESS
       )
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => this._auth.saveToken(payload))
       .switchMap<any, any>(payload =>{
         //console.log('-->',payload)
         if(payload){

           return Observable.concat(
             Observable.of(<Action>{ type: AuthActions.TOKEN_SAVE_SUCCESS, payload: payload }),
             Observable.of(<Action>{ type: AuthActions.CHECK_AUTH })
           )
         }
         else {
           return Observable.concat(
             Observable.of( <Action>{ type: AuthActions.TOKEN_SAVE_FAILED }),
             Observable.of(<Action>{ type: AuthActions.CHECK_AUTH_FAILED })
           )
         }
       })

 }
