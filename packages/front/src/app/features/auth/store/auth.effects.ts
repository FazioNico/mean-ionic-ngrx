import { Injectable } from '@angular/core';
import { of, concat } from 'rxjs';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as Auth from './auth.actions';
import { AuthService } from '../services/auth.service';
import { IAuthState } from './auth.reducer';
import { ICurrentUserState } from '@app/features/auth/store/currentUser.reducer';

@Injectable()
export class AuthEffects {

    constructor(
        private _action$: Actions,
        private _auth: AuthService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _store: Store<{auth: IAuthState, currentUser: ICurrentUserState}>,

    ) {
    }

    @Effect() loginAction$ = this._action$.pipe(
        ofType(Auth.AuthActions.LOGIN),
        switchMap((action: any) => this._auth.doAuth(action.payload)),
        switchMap((result) =>
        (result.user)
          ? of(new Auth.LoginSuccessAction(result))
          : of(new Auth.ErrorAction(result))
        ),
        catchError((err: any) => of(new Auth.ErrorAction(err)))
    );

    @Effect() checkMainAction$ = this._action$.pipe(
        ofType(Auth.AuthActions.CHECK_AUTH),
        switchMap(_ => this._store.pipe(select(state => state.currentUser))),
        switchMap(currentUser => this._auth.isAuth(currentUser === null)),
        switchMap((res: any) =>
            (res.token)
                ? of(new Auth.CheckAuthSuccessAction(res))
                : of(
                        new Auth.CheckAuthNoUserSuccessAction(),
                        // TODO: dispatch Default.CLEAR Store action to clear all state
                    )
        ),
        catchError((res: any) => of(
            new Auth.ErrorAction(res)),
            // TODO: dispatch Default.CLEAR Store action to clear all state
        )
    );

    @Effect() logoutAction$ = this._action$.pipe(
       ofType(Auth.AuthActions.LOGOUT),
       switchMap(() => this._auth.doLogout()),
       switchMap(action => concat(
            of(new Auth.TokenDeleteAction()),
            of(new Auth.LogoutSuccessAction())
            // TODO: dispatch Default.CLEAR Store action to clear all state
       )),
       catchError((err: any) => of(new Auth.ErrorAction))
    );

    @Effect() createUserAction$ = this._action$.pipe(
        ofType(Auth.AuthActions.CREATE),
        // map<Action, any>(toPayload),
        switchMap((action: any) => this._auth.doCreateUser(action.payload)),
        switchMap((result) =>
            (result.user)
                ? of(new Auth.CreateSuccessAction(result))
                : of(new Auth.ErrorAction(result))
        ),
        catchError((err: any) => of(new Auth.ErrorAction(err)))
    );

    @Effect() userSuccessAction$ = this._action$.pipe(
        ofType(
            Auth.AuthActions.CREATE_SUCCESS,
            Auth.AuthActions.LOGIN_SUCCESS
        ),
        switchMap((action: any) => {
            const { payload = null } = action;
            return (payload)
                ? concat(
                    of(new Auth.TokenSaveSuccessAction(payload)),
                    of(new Auth.CheckAuthAction())
                )
                : of(new Auth.ErrorAction());
        }),
        catchError((err: any) => of(new Auth.ErrorAction(err.message))),
        tap(_ => {
            const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
            this._router.navigate([`/${(returnUrl) ? returnUrl : 'index'}`]);
          })
    );

}
