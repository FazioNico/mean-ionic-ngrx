
import { NgRxAction } from '../app.ngrx.actions';

export const ErrorActions = {
  ERROR_SHARED: '[Err] Error',
  ERROR_DISPLAY: '[Err] Display Requested',
  ERROR_DISPLAY_SUCCESS: '[Err] Display Success',
  ERROR_DISPLAY_FAILED: '[Err] Display not working',
};

export class ErrorDisplayAction extends NgRxAction<any> { type = ErrorActions.ERROR_DISPLAY; }
export class ErrorDisplaySuccessAction extends NgRxAction<any> { type = ErrorActions.ERROR_DISPLAY_SUCCESS; }
export class ErrorAction extends NgRxAction<any> { type = ErrorActions.ERROR_DISPLAY_FAILED; }

export type TErrorActions =
ErrorDisplayAction |
ErrorDisplaySuccessAction |
ErrorAction;
