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

 export interface IqueryParamsState {
     path:string
     params?:Object
 };

 export const intitialState:IqueryParamsState = {
   path: '/'
 }

 export function reducer (
   state:IqueryParamsState = intitialState,
   action:any
 ):IqueryParamsState {
     switch (action.type) {
       case ItemsActions.LOAD: {
         return Object.assign({}, state, action.payload )
       }
       case ItemsActions.UPDATE: {
         return Object.assign({}, state, action.payload )
       }
       case ItemsActions.REMOVE: {
         return Object.assign({}, state, action.payload )
       }
       case ItemsActions.CREATE: {
         return Object.assign({}, state, action.payload )
       }
       case AuthActions.LOGIN_SUCCESS: {
         return Object.assign({}, intitialState)
       }
       default: {
         return <IqueryParamsState>state;
       }
     }
 };
