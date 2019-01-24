
import { Injectable, Inject } from '@angular/core';

import { Observable , of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as Err from '../actions/err.actions';
import { ToastOptions } from '@ionic/core';
import { environment } from '@env/environment';

@Injectable()
export class ErrorsEffects {

  private _data: ToastOptions;
  private _payload: any;
  private _env: any = environment;

  constructor(
    private action$: Actions,
    // here the ionic alertControler available
    // to build alert element from action store Error
    @Inject(ToastController) private _toast: ToastController
  ) {
  }

  // handle all errors Shared by store event.reducer
  @Effect() handleErrorAction$: Observable<Action> = this.action$.pipe(
    ofType(Err.ErrorActions.ERROR_SHARED),
    // handle action type ERROR_SHARED
    // faward payload to ErrorDisplayAction(payload)
    // to display error with ionic-alert element and correct content
    switchMap((action: any) => of(new Err.ErrorDisplayAction(action.payload))),
    catchError(err => of(new Err.ErrorAction(err)))
  );

  @Effect() displayErrorAction$ = this.action$.pipe(
    ofType(Err.ErrorActions.ERROR_DISPLAY),
    switchMap(async (action: any) => {
      const { message = ''}  = action.payload || {};
      if (!message) {
        // prevent display empty message
        return action.payload;
      }
      this._payload = action.payload;
      this._data = {
        message: message.split('}').reverse()[0] || 'Error...',
        position: 'bottom',
        duration: 5000,
        cssClass: ['danger'],
        showCloseButton: true,
        closeButtonText: 'Close'
      };
      // create and display ionic alert
      const alert = await this._toast.create(this._data);
      // return alert.present()
      return await alert.present()
                        // auto close alert if env mode === test
                        .then(_ =>
                          (this._env.envName === 'test')
                            ? alert.dismiss()
                            : null
                          );
    }),
    switchMap((payload) =>
    // if payload is undefind (no error)
    // dispatch ErrorDisplaySuccessAction()
    // or display ErrorAction()
    (!payload)
      ? of(new Err.ErrorDisplaySuccessAction(this._payload))
      : of(new Err.ErrorAction(payload))
    ),
    catchError(err => of(Err.ErrorActions.ERROR_DISPLAY_FAILED))
  );

}
