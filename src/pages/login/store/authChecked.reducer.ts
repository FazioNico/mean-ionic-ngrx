/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
*/


import { AuthActions, TAuthActions } from './auth.actions';

export interface IAuthCheckedState extends Boolean {};
export const intitialState:IAuthCheckedState = false;

export function reducer (
  state:IAuthCheckedState = intitialState,
  action:TAuthActions
):IAuthCheckedState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:{
      return true
    }

    case AuthActions.CHECK_AUTH_SUCCESS: {
      return true
    }
    case AuthActions.ERROR: {
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
