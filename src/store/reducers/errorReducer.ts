/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

 import { Action } from "@ngrx/store";
 import { MainActions } from '../actions/mainActions';

 export interface IErrorState {
   error?: any;
 };

 export const intitialState:IErrorState = {
 }

 export function reducer (state:IErrorState = intitialState, action:Action):IErrorState {
     //console.log('ERROR REDUCER-> ', action);
     switch (action.type) {
       case MainActions.GET_DATAS_ARRAY_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.UPDATE_DATA_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.DELETE_DATA_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.CREATE_DATA_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.LOGIN_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.LOGOUT_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.CHECK_AUTH_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.CREATE_USER_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       case MainActions.TOKEN_SAVE_FAILED: {
         return Object.assign({}, state, { error: action.payload })
       }
       default: {
         return <IErrorState>state;
       }
     }
 };
