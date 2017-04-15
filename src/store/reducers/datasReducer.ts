/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

 import { Action } from "@ngrx/store";
 import { MainActions } from '../actions/mainActions';

 export interface IDatasState {
   dataArray: any[];
 };

 export const intitialState:IDatasState = {
   dataArray:[]
 }

 export function reducer (state:IDatasState = intitialState, action:Action):IDatasState {
     //console.log('ARRAY DATAS REDUCER-> ', action);
     switch (action.type) {
       case MainActions.GET_DATAS_ARRAY: {
         return Object.assign({}, state)
       }
       case MainActions.GET_DATAS_ARRAY_SUCCESS: {
         return Object.assign({}, state, { dataArray: action.payload })
       }
       default: {
         return <IDatasState>state;
       }
     }
 };
