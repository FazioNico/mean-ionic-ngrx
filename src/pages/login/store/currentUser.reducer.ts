/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
*/

import { AuthActions, TAuthActions } from './auth.actions';
//import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IUserModel } from "../../../../server/app/models/user.models";


// TODO: add & use ngrx Entities
//export const adapter: EntityAdapter<User> = createEntityAdapter<ICurrentUserState>();

export interface ICurrentUserState extends IUserModel{};
export const intitialState:ICurrentUserState | null = null

export function reducer (
  state:ICurrentUserState | null = intitialState,
  action:TAuthActions
):ICurrentUserState | null {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:{
      return Object.assign({}, state, )
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
