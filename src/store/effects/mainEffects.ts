/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-04-2017
 */


 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import { MainActions } from '../../store/actions/mainActions';
 import { DatasService } from "../../providers/datas-service/datas-service";
 import { AuthService } from "../../providers/auth-service/auth-service";

 @Injectable()
 export class MainEffects {

     constructor(
       private action$: Actions,
       private _database: DatasService,
       private _auth: AuthService
     ) {
     }

     @Effect() loadAction$ = this.action$
         // Listen for the 'GET_DATAS_ARRAY' action
         .ofType(MainActions.GET_DATAS_ARRAY)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
            return this._database.getDatasArray(payload)
         })

     @Effect() updateAction$ = this.action$
         // Listen for the 'UPDATE_DATA' action
         .ofType(MainActions.UPDATE_DATA)
         .map<Action, any>(toPayload)
         .switchMap((payload:any) => {
            return this._database.update(payload)
         })

     @Effect() removeAction$ = this.action$
         // Listen for the 'DELETE_DATA' action
         .ofType(MainActions.DELETE_DATA)
         .map<Action, any>(toPayload)
         .switchMap((payload:any) => {
            return this._database.delete(payload)
         })

     @Effect() createAction$ = this.action$
         // Listen for the 'CREATE_DATA' action
         .ofType(MainActions.CREATE_DATA)
         .map<Action, any>(toPayload)
         .switchMap((payload:any) => {
            return this._database.create(payload)
         })


     @Effect() loginAction$ = this.action$
         // Listen for the 'LOGIN' action
         .ofType(MainActions.LOGIN)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
             return this._auth.doAuth(payload)
         })

     @Effect() loginSuccessAction$ = this.action$
         // Listen for the 'LOGIN' action
         .ofType(MainActions.LOGIN_SUCCESS)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
             return this._auth.saveToken(payload)
         })
         .map<Action, any>((payload)=> {
           console.log(payload)
           if(payload.type === MainActions.TOKEN_SAVE_SUCCESS){
             return <Action>{ type: MainActions.CHECK_AUTH }
           }
           else {
             return <Action>{ type: MainActions.TOKEN_SAVE_FAILED }
           }
         })

     @Effect() checkAuth$ = this.action$
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

 }
