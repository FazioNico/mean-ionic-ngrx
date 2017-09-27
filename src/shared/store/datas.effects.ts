/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   26-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
 */

 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import { DatasActions } from './datas.actions';
 //import { ItemsService } from "./items.service";

 import { DatasService } from '../services/datas.service';

 @Injectable()
 export class DatasEffects {

   constructor(
     private action$: Actions,
     private _database: DatasService
   ) {
   }
   
   @Effect() loadAction$ = this.action$
       // Listen for the 'GET_DATAS_ARRAY' action
       .ofType(DatasActions.GET_DATAS_ARRAY)
       .map<Action, any>(toPayload)
       .switchMap((payload:Observable<any>) => {
         console.log('deh!')
         return this._database.getDatasArray(payload)
       })

   @Effect() updateAction$ = this.action$
       // Listen for the 'UPDATE_DATA' action
       .ofType(DatasActions.UPDATE_DATA)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => {
         return this._database.update(payload)
       })

   @Effect() removeAction$ = this.action$
       // Listen for the 'DELETE_DATA' action
       .ofType(DatasActions.DELETE_DATA)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => {
         return this._database.delete(payload)
       })

   @Effect() createAction$ = this.action$
       // Listen for the 'CREATE_DATA' action
       .ofType(DatasActions.CREATE_DATA)
       .map<Action, any>(toPayload)
       .switchMap((payload:any) => {
         return this._database.create(payload)
       })

 }
