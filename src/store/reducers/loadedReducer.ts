/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface ILoadedState  {
   loaded: boolean;
 };

 export const intitialState:ILoadedState = {
   loaded: false
 }

 export function reducer (state:ILoadedState = intitialState, action:Action):ILoadedState {
     //console.log('LOADED REDUCER-> ', action);
     switch (action.type) {
       case 'GET_DATAS_ARRAY': {
         return Object.assign({}, state, { loaded: false})
       }
       case 'GET_DATAS_ARRAY_SUCCESS': {
         return Object.assign({}, state, { loaded: true})
       }
       case 'GET_DATAS_ARRAY_FAILED': {
         return Object.assign({}, state, { loaded: false})
       }

       case 'UPDATE_DATA': {
         return Object.assign({}, state, { loaded: false})
       }
       case 'UPDATE_DATA_SUCCESS': {
         return Object.assign({}, state, { loaded: true})
       }
       case 'UPDATE_DATA_FAILED': {
         return Object.assign({}, state, { loaded: false})
       }

       case 'DELETE_DATA': {
         return Object.assign({}, state, { loaded: false})
       }
       case 'DELETE_DATA_SUCCESS': {
         return Object.assign({}, state, { loaded: true})
       }
       case 'DELETE_DATA_FAILED': {
         return Object.assign({}, state, { loaded: false})
       }

       case 'CREATE_DATA': {
         return Object.assign({}, state, { loaded: false})
       }
       case 'CREATE_DATA_SUCCESS': {
         return Object.assign({}, state, { loaded: true})
       }
       case 'CREATE_DATA_FAILED': {
         return Object.assign({}, state, { loaded: false})
       }

       default: {
         return <ILoadedState>state;
       }
     }
 };
