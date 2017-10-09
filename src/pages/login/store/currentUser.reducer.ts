/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/

import { AuthActions, TAuthActions } from './auth.actions';
//import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IUserModel } from "../../../../server/app/models/user.models";


export type Action = TAuthActions;
export interface ICurrentUserState extends IUserModel {};

// TODO: add & use ngrx Entities
//export const adapter: EntityAdapter<User> = createEntityAdapter<ICurrentUserState>();

export const intitialState:ICurrentUserState = null

export function reducer (state:ICurrentUserState = intitialState, action:Action|any):ICurrentUserState {
  //console.log('CURRENT USER REDUCER-> ', action);
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:{
      return Object.assign({}, state, )
      // return Object.assign({}, state,  action.payload.user)
    }
    case AuthActions.CHECK_AUTH_SUCCESS:{
      return Object.assign({}, state, action.payload )
    }
    case AuthActions.LOGOUT_SUCCESS:{
      return intitialState
    }

    // case AuthActions.CREATE_USER_SUCCESS:{
    //   return Object.assign({},  action.payload.user )
    // }
    case AuthActions.CREATE_SUCCESS:{
      return Object.assign({},  action.payload.user )
    }
    default: {
      return <ICurrentUserState>state;
    }
  }
};
