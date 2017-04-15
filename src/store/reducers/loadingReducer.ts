/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface ILoadingState {
   loading: boolean;
 };

 export const intitialState:ILoadingState = {
   loading: false
 }

 export function reducer (state:ILoadingState = intitialState, action:Action):ILoadingState {
     //console.log('LOADER REDUCER-> ', action);
     switch (action.type) {
       case 'GET_DATAS_ARRAY': {
         return Object.assign({}, state, { loading: true})
       }
       case 'GET_DATAS_ARRAY_SUCCESS': {
         return Object.assign({}, state, { loading: false})
       }
       default: {
         return <ILoadingState>state;
       }
     }
 };
