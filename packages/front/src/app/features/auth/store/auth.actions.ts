
import { NgRxAction } from '@app/@store/app.ngrx.actions';
import { IAuthState } from '@app/features/auth/store/auth.reducer';
import { HttpServerResponse } from '../services/auth.service';

/**
 * PATTERN DESIGN:
 * Simply add special word to your action definition.
 * Exemple:
 * - Using "Requested" to OPEN global application loader (modal spinner)
 * - Using "Success" to CLOSE global application loader (modal spinner)
 */
export const AuthActions = {
  CHECK_AUTH: '[Auth] Check Auth Requested',
  CHECK_AUTH_SUCCESS: '[Auth] Check Auth: user Success',
  CHECK_AUTH_NO_USER: '[Auth] Check Auth: no user Success',
  LOGIN: '[Auth] Login Requested',
  LOGIN_SUCCESS: '[Auth] Login Success',
  LOGOUT: '[Auth] Logout',
  LOGOUT_SUCCESS: '[Auth] Logout Success',
  CREATE: '[Auth] CREATE Requested',
  CREATE_SUCCESS: '[Auth] CREATE Success',
  TOKEN_SAVE: '[Auth] TOKEN_SAVE',
  TOKEN_SAVE_SUCCESS: '[Auth] TOKEN_SAVE Success',
  TOKEN_DELETE: '[Auth] TOKEN_REMOVE',
  TOKEN_DELETE_SUCCESS: '[Auth] TOKEN_REMOVE Success',
  ERROR: '[Auth] Error'
};

export class CheckAuthAction extends NgRxAction<any> { type = AuthActions.CHECK_AUTH; }
export class CheckAuthSuccessAction extends NgRxAction<any> { type = AuthActions.CHECK_AUTH_SUCCESS; }
export class CheckAuthNoUserSuccessAction extends NgRxAction<IAuthState> { type = AuthActions.CHECK_AUTH_NO_USER; }

export class LoginAction extends NgRxAction<any> { type = AuthActions.LOGIN; }
export class LoginSuccessAction extends NgRxAction<HttpServerResponse> { type = AuthActions.LOGIN_SUCCESS; }

export class LogoutAction extends NgRxAction<any> { type = AuthActions.LOGOUT; }
export class LogoutSuccessAction extends NgRxAction<HttpServerResponse> { type = AuthActions.LOGOUT_SUCCESS; }

export class CreateAction extends NgRxAction<any> { type = AuthActions.CREATE; }
export class CreateSuccessAction extends NgRxAction<HttpServerResponse> { type = AuthActions.CREATE_SUCCESS; }

export class TokenSaveAction extends NgRxAction<any> { type = AuthActions.TOKEN_SAVE; }
export class TokenSaveSuccessAction extends NgRxAction<any> { type = AuthActions.TOKEN_SAVE_SUCCESS; }

export class TokenDeleteAction extends NgRxAction<any> { type = AuthActions.TOKEN_DELETE; }
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
