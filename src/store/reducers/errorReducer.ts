/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 30-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';
import { ErrorActions } from '../actions/err.actions';
import { ItemsActions } from "../../pages/items/store/items.actions";

export interface IErrorState extends String {};

export const intitialState:IErrorState = null

export function reducer (state:IErrorState = intitialState, action:any):IErrorState {
  //console.log('ERROR REDUCER-> ', action);
  switch (action.type) {
    case ItemsActions.ERROR: {
      return Object.assign({},action.payload )
    }

    case AuthActions.ERROR: {
      console.log('action.payload->', action.payload)
      return Object.assign(action.payload )
    }

    case ErrorActions.ERROR_DISPLAY_SUCCESS: {
        console.log('intitialState->', intitialState)
      return intitialState
    }
    // case AuthActions.LOGOUT_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case AuthActions.CHECK_AUTH_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case AuthActions.CREATE_USER_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    // case AuthActions.TOKEN_SAVE_FAILED: {
    //   return Object.assign({},action.payload )
    // }
    default: {
      return <IErrorState>state;
    }
  }
};
