/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */


 import { Injectable } from "@angular/core";
 import { Observable } from 'rxjs';
 import { Action } from '@ngrx/store';
 import { Effect, Actions, toPayload } from "@ngrx/effects";

 import { MainActions } from '../../store/actions/mainActions';
 import { DatasService } from "../../providers/datas-service/datas-service";

 @Injectable()
 export class MainEffects {

     constructor(
       private action$: Actions,
       private _database: DatasService
     ) {
     }

     @Effect() getArray$ = this.action$
         // Listen for the 'GET_DATAS_ARRAY' action
         .ofType(MainActions.GET_DATAS_ARRAY)
         .map<Action, any>(toPayload)
         .switchMap((payload:Observable<any>) => {
            // return Observable.of({ type: 'LOAD_DATAS_ARRAY', payload: { loading: true } })
            return this._database.getDatasArray(payload)
         })

 }
