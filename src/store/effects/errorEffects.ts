/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
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
      // Listen for the ERROR_DISPLAY action
      .ofType(
        MainActions.ERROR_DISPLAY,
      )
      .map<Action, any>(toPayload)
      .switchMap((payload:Observable<any>) => this._alert.doDisplayAlert(payload))
      .catch(err=> {
        console.log(err)
        return Observable.of({type:'ERROR_DISPLAY_FAILED', payload:err})
      })
}
