/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';

export interface IErrorState extends String {};

export const intitialState:IErrorState = null

export function reducer (state:IErrorState = intitialState, action:any):IErrorState {
  //console.log('ERROR REDUCER-> ', action);
  switch (action.type) {
    // case MainActions.GET_DATAS_ARRAY_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case MainActions.UPDATE_DATA_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case MainActions.DELETE_DATA_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case MainActions.CREATE_DATA_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    case AuthActions.LOGIN_FAILED: {
      return Object.assign(action.payload )
    }
    case AuthActions.LOGOUT_FAILED: {
      return Object.assign({},action.payload )
    }
    case AuthActions.CHECK_AUTH_FAILED: {
      return Object.assign({},action.payload )
    }
    case AuthActions.CREATE_USER_FAILED: {
      return Object.assign({},action.payload )
    }
    case AuthActions.TOKEN_SAVE_FAILED: {
      return Object.assign({},action.payload )
    }
    default: {
      return <IErrorState>intitialState;
    }
  }
};
