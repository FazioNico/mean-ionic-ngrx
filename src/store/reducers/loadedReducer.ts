/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';

export interface ILoadedState extends Boolean {};

export const intitialState:ILoadedState = false;

export function reducer (state:ILoadedState = intitialState, action:any):ILoadedState {
  //console.log('LOADED REDUCER-> ', action);
  switch (action.type) {
    // case MainActions.GET_DATAS_ARRAY: {
    //   return false
    // }
    // case MainActions.GET_DATAS_ARRAY_SUCCESS: {
    //   return true
    // }
    // case MainActions.GET_DATAS_ARRAY_FAILED: {
    //   return false
    // }
    //
    // case MainActions.UPDATE_DATA: {
    //   return false
    // }
    // case MainActions.UPDATE_DATA_SUCCESS: {
    //   return true
    // }
    // case MainActions.UPDATE_DATA_FAILED: {
    //   return false
    // }
    //
    // case MainActions.DELETE_DATA: {
    //   return false
    // }
    // case MainActions.DELETE_DATA_SUCCESS: {
    //   return true
    // }
    // case MainActions.DELETE_DATA_FAILED: {
    //   return false
    // }
    //
    // case MainActions.CREATE_DATA: {
    //   return false
    // }
    // case MainActions.CREATE_DATA_SUCCESS: {
    //   return true
    // }
    // case MainActions.CREATE_DATA_FAILED: {
    //   return false
    // }

    case AuthActions.CHECK_AUTH_SUCCESS: {
      return true
    }
    case AuthActions.CHECK_AUTH_FAILED: {
      return false
    }
    case AuthActions.CHECK_AUTH_NO_USER: {
      return false
    }

    case AuthActions.LOGIN: {
     return false
    }
    case AuthActions.LOGIN_SUCCESS: {
     return true
    }
    case AuthActions.LOGIN_FAILED: {
     return false
    }

    case AuthActions.LOGOUT: {
      return false
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return true
    }
    default: {
      return <ILoadedState>state;
    }
  }
};
