/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';
import { ItemsActions } from "../../pages/items/store/items.actions";
import { ErrorActions } from '../actions/err.actions';

export interface ILoadingState extends Boolean {};

export const intitialState:ILoadingState = false

export function reducer (state:ILoadingState = intitialState, action:any):ILoadingState {
  //console.log('LOADER REDUCER-> ', action);
  switch (action.type) {
    //
    case ItemsActions.LOAD: {
      return true
    }
    case ItemsActions.LOAD_SUCCESS: {
      return false
    }
    case ItemsActions.ERROR: {
      return false
    }
    //
    case ItemsActions.UPDATE: {
      return true
    }
    case ItemsActions.UPDATE_SUCCESS: {
      return false
    }
    //
    case ItemsActions.REMOVE: {
      return true
    }
    case ItemsActions.REMOVE_SUCCESS: {
      return false
    }
    //
    case ItemsActions.CREATE: {
      return true
    }
    case ItemsActions.CREATE_SUCCESS: {
      return false
    }

    //
    case AuthActions.CHECK_AUTH: {
      return true
    }
    case AuthActions.CHECK_AUTH_SUCCESS: {
      return false
    }
    // case AuthActions.CHECK_AUTH_FAILED: {
    //   return false
    // }
    case AuthActions.CHECK_AUTH_NO_USER: {
      return false
    }

    case AuthActions.LOGIN: {
      return true
    }
    case AuthActions.LOGIN_SUCCESS: {
      return false
    }
    // case AuthActions.LOGIN_FAILED: {
    //   return false
    // }

    case AuthActions.LOGOUT: {
      return true
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return false
    }

    case ErrorActions.ERROR_DISPLAY: {
      return false
    }

    default: {
      return <ILoadingState>state;
    }
  }
};
