/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 18-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface ICurrentUserState {
   currentUser?: any;
 };

 export const intitialState:ICurrentUserState = {}

 export function reducer (state:ICurrentUserState = intitialState, action:Action):ICurrentUserState {
     //console.log('CURRENT USER REDUCER-> ', action);
     switch (action.type) {
       case 'LOGIN_SUCCESS':{
          return Object.assign({}, state, { currentUser: action.payload.user })
       }
       case 'CHECK_AUTH_SUCCESS':{
          return Object.assign({}, state, { currentUser: action.payload })
       }
       default: {
         return <ICurrentUserState>state;
       }
     }
 };
