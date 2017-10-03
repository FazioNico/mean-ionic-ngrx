/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-10-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../../pages/login/store/auth.actions';
import { ItemsActions } from "../../pages/items/store/items.actions";

export interface ILoadedState extends Boolean {};

export const intitialState:ILoadedState = false;

export function reducer (state:ILoadedState = intitialState, action:any):ILoadedState {
  //console.log('LOADED REDUCER-> ', action);
  switch (action.type) {
    case ItemsActions.LOAD: {
      return false
    }
    case ItemsActions.LOAD_SUCCESS: {
      return true
    }
    case ItemsActions.ERROR: {
      return false
    }
    //
    case ItemsActions.UPDATE: {
      return false
    }
    case ItemsActions.UPDATE_SUCCESS: {
      return true
    }
    //
    case ItemsActions.REMOVE: {
      return false
    }
    case ItemsActions.REMOVE_SUCCESS: {
      return true
    }
    //
    case ItemsActions.CREATE: {
      return false
    }
    case ItemsActions.CREATE_SUCCESS: {
      return true
    }
    //

    case AuthActions.CHECK_AUTH_SUCCESS: {
      return true
    }
    case AuthActions.CHECK_AUTH_NO_USER: {
      return true
    }

    case AuthActions.LOGIN: {
     return false
    }
    case AuthActions.LOGIN_SUCCESS: {
     return true
    }
    // case AuthActions.LOGIN_FAILED: {
    //  return false
    // }

    case AuthActions.LOGOUT: {
      return false
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return true
    }

    case AuthActions.ERROR: {
     return false
    }
    default: {
      return <ILoadedState>state;
    }
  }
};
