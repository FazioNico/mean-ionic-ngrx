/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   19-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
*/

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from "@ngrx/effects";

import { MainActions } from '../../store/actions/mainActions';
import { DatasService } from "../../providers/datas-service/datas-service";
import { AlertService } from "../../providers/alert-service/alert-service";

@Injectable()
export class DatasEffects {

  constructor(
    private action$: Actions,
    private _database: DatasService,
    private _alert: AlertService
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

  @Effect() handleErrorAction$ = this.action$
      // Listen for the 'CREATE_USER' action
      .ofType(
        MainActions.GET_DATAS_ARRAY_FAILED,
        MainActions.DELETE_DATA_FAILED,
        MainActions.CREATE_DATA_FAILED,
        MainActions.UPDATE_DATA_FAILED,
      )
      .map<Action, any>(toPayload)
      .switchMap((payload:Observable<any>) => {
        return this._alert.doDisplayAlert(payload)
      })
}
