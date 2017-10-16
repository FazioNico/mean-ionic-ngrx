/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
 */

 import { AuthActions, TAuthActions } from '../../pages/login/store/auth.actions';
 import { ItemsActions, TItemsActions } from "../../pages/items/store/items.actions";

 export interface IqueryParamsState {
     path:string
     params?:Object
 };
 export const intitialState:IqueryParamsState = {
   path: '/'
 }

 export function reducer (
   state:IqueryParamsState = intitialState,
   action:TAuthActions|TItemsActions
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
