/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';

export interface IAuthCheckedState extends Boolean {};

export const intitialState:IAuthCheckedState = false;

export function reducer (state:IAuthCheckedState = intitialState, action:any):IAuthCheckedState {
  //console.log('CURRENT USER REDUCER-> ', action);
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:{
      console.log(state, action.payload)
      return true
    }

    case AuthActions.CHECK_AUTH_SUCCESS: {
      return true
    }
    case AuthActions.CHECK_AUTH_FAILED: {
      return false
    }

    case AuthActions.TOKEN_DELETE: {
      return Object.assign(intitialState)
    }

    default: {
      return <IAuthCheckedState>state;
    }
  }
};
