/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
*/

import { Action } from '@ngrx/store';
import { NgRxAction } from '../../../store/ngrx.actions';
import { IAuthCheckedState } from "./authChecked.reducer";
import { ICurrentUserState } from "./currentUser.reducer";

export const AuthActions = {
  CHECK_AUTH: '[Auth] Check Auth Requested',
  CHECK_AUTH_SUCCESS: '[Auth] Check Auth: user Success',
  CHECK_AUTH_NO_USER: '[Auth] Check Auth: no user Success',
  LOGIN: '[Auth] Login Requested',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGOUT: '[Auth] Logout Requested',
  LOGOUT_SUCCESS: '[Auth] Logout Success',
  CREATE: '[Auth] CREATE Requested',
  CREATE_SUCCESS: '[Auth] CREATE Success',
  TOKEN_SAVE: '[Auth] TOKEN_SAVE Requested',
  TOKEN_SAVE_SUCCESS: '[Auth] TOKEN_SAVE Success',
  TOKEN_DELETE: '[Auth] TOKEN_REMOVE Requested',
  TOKEN_DELETE_SUCCESS: '[Auth] TOKEN_REMOVE Success',
  ERROR: '[Auth] Error'
}

export class CheckAuthAction extends NgRxAction<any> implements Action { type = AuthActions.CHECK_AUTH; }
export class CheckAuthSuccessAction extends NgRxAction<IAuthCheckedState> implements Action { type = AuthActions.CHECK_AUTH_SUCCESS; }
export class CheckAuthNoUserSuccessAction extends NgRxAction<IAuthCheckedState> implements Action { type = AuthActions.CHECK_AUTH_NO_USER; }

export class LoginAction extends NgRxAction<any> { type = AuthActions.LOGIN; }
export class LoginSuccessAction extends NgRxAction<ICurrentUserState> { type = AuthActions.LOGIN_SUCCESS; }

export class LogoutAction extends NgRxAction<any> { type = AuthActions.LOGOUT; }
export class LogoutSuccessAction extends NgRxAction<any> { type = AuthActions.LOGOUT_SUCCESS; }

export class CreateAction extends NgRxAction<any>{ type = AuthActions.CREATE; }
export class CreateSuccessAction extends NgRxAction<any> { type = AuthActions.CREATE_SUCCESS; }

export class TokenSaveAction extends NgRxAction<any>{ type = AuthActions.TOKEN_SAVE; }
export class TokenSaveSuccessAction extends NgRxAction<any> { type = AuthActions.TOKEN_SAVE_SUCCESS; }

export class TokenDeleteAction extends NgRxAction<any>{ type = AuthActions.TOKEN_DELETE; }
export class TokenDeleteSuccessAction extends NgRxAction<any> { type = AuthActions.TOKEN_DELETE_SUCCESS; }

export class ErrorAction extends NgRxAction<any> { type = AuthActions.ERROR; }

export type TAuthActions =
CheckAuthAction | CheckAuthSuccessAction |
LoginAction | LoginSuccessAction |
LogoutAction | LogoutSuccessAction |
CreateAction | CreateSuccessAction |
TokenSaveAction | TokenSaveSuccessAction |
TokenDeleteAction | TokenDeleteSuccessAction |
ErrorAction;
