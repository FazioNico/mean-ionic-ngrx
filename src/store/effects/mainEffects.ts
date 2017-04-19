/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */


 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import { MainActions } from '../../store/actions/mainActions';
 import { AuthService } from "../../providers/auth-service/auth-service";
 import { AlertService } from "../../providers/alert-service/alert-service";

 @Injectable()
 export class MainEffects {

     constructor(
       private action$: Actions,
       private _auth: AuthService,
       private _alert: AlertService
     ) {
     }





     @Effect() loginAction$ = this.action$
         // Listen for the 'LOGIN' action
         .ofType(MainActions.LOGIN)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
             return this._auth.doAuth(payload)
         })

     @Effect() checkAuthAction$ = this.action$
         // Listen for the 'CHECK_AUTH' action
         .ofType(MainActions.CHECK_AUTH)
         .switchMap<Action, any>(() => this._auth.isAuth())
         .take(1)
         .map<Action, any>((_result:any) => {
             if (_result.type === MainActions.CHECK_AUTH_SUCCESS) {
                 return <Action>{ type: MainActions.CHECK_AUTH_SUCCESS, payload: _result.payload }
             } else {
                 return <Action>{ type: MainActions.CHECK_AUTH_NO_USER, payload: null }
             }
         }).catch((res: any) => {
           console.log('-->', res)
           return Observable.of({ type: MainActions.CHECK_AUTH_FAILED, payload: res })
         })

     @Effect() logout$ = this.action$
         // Listen for the 'LOGOUT' action
         .ofType(MainActions.LOGOUT)
         .switchMap<Action, any>(() => this._auth.doLogout())
         // If successful, dispatch success action with result
         .flatMap<Action, any>(action =>{
             return Observable.concat(
               Observable.of(<Action>{ type: action.type }),
               Observable.of(<Action>{type: MainActions.LOGOUT_SUCCESS, payload: null })
             )
         })
         //.map((res: Observable<any>) => ({ type: MainActions.LOGOUT_SUCCESS, payload: null }))
         // If request fails, dispatch failed action
         .catch((res: any) => Observable.of({ type: MainActions.LOGOUT_FAILED, payload: res }))

     @Effect() createUserAction$ = this.action$
         // Listen for the 'CREATE_USER' action
         .ofType(MainActions.CREATE_USER)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
             console.log("in createUser$", payload)
             return this._auth.doCreateUser(payload)
         })

     @Effect() userSuccessAction$ = this.action$
         // Listen for the 'LOGIN_SUCCESS & CREATE_USER_SUCCESS' action
         .ofType(MainActions.CREATE_USER_SUCCESS, MainActions.LOGIN_SUCCESS)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
             return this._auth.saveToken(payload)
         })
         .flatMap<Action, any>(payload =>{
           if(payload.type === MainActions.TOKEN_SAVE_SUCCESS){
             return Observable.concat(
               Observable.of(<Action>{ type: MainActions.TOKEN_SAVE_SUCCESS, payload: payload }),
               Observable.of(<Action>{ type: MainActions.CHECK_AUTH })
             )
           }
           else {
             return Observable.concat(
               Observable.of( <Action>{ type: MainActions.TOKEN_SAVE_FAILED }),
               Observable.of(<Action>{ type: MainActions.CHECK_AUTH_FAILED })
             )
           }
        })

    @Effect() handleErrorAction$ = this.action$
        // Listen for the 'CREATE_USER' action
        .ofType(
          MainActions.LOGIN_FAILED,
          MainActions.LOGOUT_FAILED,
          MainActions.CHECK_AUTH_FAILED,
          MainActions.CREATE_USER_FAILED
        )
        .map<Action, any>(toPayload)
        .switchMap((payload:Observable<any>) => {
            return this._alert.doDisplayAlert(payload)
        })
 }
