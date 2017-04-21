/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   19-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from "@ngrx/effects";

import { MainActions } from '../../store/actions/mainActions';
import { DatasService } from "../../providers/datas-service/datas-service";

@Injectable()
export class DatasEffects {

  constructor(
    private action$: Actions,
    private _database: DatasService
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

}
