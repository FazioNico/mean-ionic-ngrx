/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-09-2017
 */

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { NgRxAction } from '../ngrx.actions';

export const ErrorActions = {
  ERROR_DISPLAY: '[Err] Display Requested',
  ERROR_DISPLAY_SUCCESS: '[Err] Display Success',
  ERROR_DISPLAY_FAILED: '[Err] Display not working',
}

export class ErrorDisplayAction extends NgRxAction<any> implements Action { type = ErrorActions.ERROR_DISPLAY; }
export class ErrorDisplaySuccessAction extends NgRxAction<any> implements Action { type = ErrorActions.ERROR_DISPLAY_SUCCESS; }
export class ErrorAction extends NgRxAction<any> { type = ErrorActions.ERROR_DISPLAY_FAILED; }
