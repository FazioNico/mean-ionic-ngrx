/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

 import { Action } from "@ngrx/store";
 import { MainActions } from '../actions/mainActions';

 export interface ILoadingState {
   loading: boolean;
 };

 export const intitialState:ILoadingState = {
   loading: false
 }

 export function reducer (state:ILoadingState = intitialState, action:Action):ILoadingState {
     //console.log('LOADER REDUCER-> ', action);
     switch (action.type) {

       case MainActions.GET_DATAS_ARRAY: {
         return Object.assign({}, state, { loading: true})
       }
       case MainActions.GET_DATAS_ARRAY_SUCCESS: {
         return Object.assign({}, state, { loading: false})
       }
       case MainActions.GET_DATAS_ARRAY_FAILED: {
         return Object.assign({}, state, { loading: false})
       }

       case MainActions.UPDATE_DATA: {
         return Object.assign({}, state, { loading: true})
       }
       case MainActions.UPDATE_DATA_SUCCESS: {
         return Object.assign({}, state, { loading: false})
       }
       case MainActions.UPDATE_DATA_FAILED: {
         return Object.assign({}, state, { loading: false})
       }

       case MainActions.DELETE_DATA: {
         return Object.assign({}, state, { loading: true})
       }
       case MainActions.DELETE_DATA_SUCCESS: {
         return Object.assign({}, state, { loading: false})
       }
       case MainActions.DELETE_DATA_FAILED: {
         return Object.assign({}, state, { loading: false})
       }

       case MainActions.CREATE_DATA: {
         return Object.assign({}, state, { loading: true})
       }
       case MainActions.CREATE_DATA_SUCCESS: {
         return Object.assign({}, state, { loading: false})
       }
       case MainActions.CREATE_DATA_FAILED: {
         return Object.assign({}, state, { loading: false})
       }

       case MainActions.CHECK_AUTH: {
         return Object.assign({}, state, { loading: true })
       }
       case MainActions.CHECK_AUTH_SUCCESS: {
         return Object.assign({}, state, { loading: false })
       }
       case MainActions.CHECK_AUTH_FAILED: {
         return Object.assign({}, state, { loading: false })
       }
       case MainActions.CHECK_AUTH_NO_USER: {
         return Object.assign({}, state, { loading: false })
       }

       case MainActions.LOGIN: {
         return Object.assign({}, state, { loading: true })
       }
       case MainActions.LOGIN_SUCCESS: {
         return Object.assign({}, state, { loading: false })
       }
       case MainActions.LOGIN_FAILED: {
         return Object.assign({}, state, { loading: false })
       }

       case MainActions.LOGOUT: {
         return Object.assign({}, state, { loading: true })
       }
       case MainActions.LOGOUT_SUCCESS: {
         return Object.assign({}, state, { loading: false })
       }

       default: {
         return <ILoadingState>state;
       }
     }
 };
