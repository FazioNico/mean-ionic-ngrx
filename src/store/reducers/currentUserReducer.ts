/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { AuthActions } from '../actions/auth.actions';

export interface ICurrentUserState extends Object {};

export const intitialState:ICurrentUserState = null

export function reducer (state:ICurrentUserState = intitialState, action:any):ICurrentUserState {
  //console.log('CURRENT USER REDUCER-> ', action);
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:{
      return Object.assign({}, state,  action.payload.user)
    }
    case AuthActions.CHECK_AUTH_SUCCESS:{
      return Object.assign({}, state, action.payload )
    }
    case AuthActions.LOGOUT_SUCCESS:{
      return intitialState
    }

    case AuthActions.CREATE_USER_SUCCESS:{
      return Object.assign({},  action.payload.user )
    }
    default: {
      return <ICurrentUserState>state;
    }
  }
};
