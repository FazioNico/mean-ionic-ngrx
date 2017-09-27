/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';

export interface ILoadingState extends Boolean {};

export const intitialState:ILoadingState = false

export function reducer (state:ILoadingState = intitialState, action:any):ILoadingState {
  //console.log('LOADER REDUCER-> ', action);
  switch (action.type) {
    //
    // case MainActions.GET_DATAS_ARRAY: {
    //   return true
    // }
    // case MainActions.GET_DATAS_ARRAY_SUCCESS: {
    //   return false
    // }
    // case MainActions.GET_DATAS_ARRAY_FAILED: {
    //   return false
    // }
    //
    // case MainActions.UPDATE_DATA: {
    //   return true
    // }
    // case MainActions.UPDATE_DATA_SUCCESS: {
    //   return false
    // }
    // case MainActions.UPDATE_DATA_FAILED: {
    //   return false
    // }
    //
    // case MainActions.DELETE_DATA: {
    //   return true
    // }
    // case MainActions.DELETE_DATA_SUCCESS: {
    //   return false
    // }
    // case MainActions.DELETE_DATA_FAILED: {
    //   return false
    // }
    //
    // case MainActions.CREATE_DATA: {
    //   return true
    // }
    // case MainActions.CREATE_DATA_SUCCESS: {
    //   return false
    // }
    // case MainActions.CREATE_DATA_FAILED: {
    //   return false
    // }
    //
    case AuthActions.CHECK_AUTH: {
      return true
    }
    case AuthActions.CHECK_AUTH_SUCCESS: {
      return false
    }
    case AuthActions.CHECK_AUTH_FAILED: {
      return false
    }
    case AuthActions.CHECK_AUTH_NO_USER: {
      return false
    }

    case AuthActions.LOGIN: {
      return true
    }
    case AuthActions.LOGIN_SUCCESS: {
      return false
    }
    case AuthActions.LOGIN_FAILED: {
      return false
    }

    case AuthActions.LOGOUT: {
      return true
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return false
    }

    default: {
      return <ILoadingState>state;
    }
  }
};
