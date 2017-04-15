/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
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
       default: {
         return <ILoadedState>state;
       }
     }
 };
