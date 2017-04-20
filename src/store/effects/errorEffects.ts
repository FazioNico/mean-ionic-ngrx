/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/


import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from "@ngrx/effects";

import { MainActions } from '../../store/actions/mainActions';
import { AlertService } from "../../providers/alert-service/alert-service";

@Injectable()
export class ErrorEffects {

  constructor(
    private action$: Actions,
    private _alert: AlertService
  ) {
  }

  @Effect() handleErrorAction$ = this.action$
      // Listen for the '*_FAILED' action
      .ofType(
        MainActions.LOGIN_FAILED,
        MainActions.LOGOUT_FAILED,

        MainActions.CHECK_AUTH_FAILED,
        MainActions.CREATE_USER_FAILED,

        MainActions.TOKEN_SAVE_FAILED,

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
