/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
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
       case MainActions.UPDATE_DATA_SUCCESS: {
         return Object.assign({}, state, {
           dataArray: [...state.dataArray.map((item: any) => {
             return item._id === action.payload.response._id ? action.payload.response : item;
           })]
         })
       }
       case MainActions.DELETE_DATA_SUCCESS: {
         return Object.assign({}, state, {
           dataArray: [...state.dataArray.filter((item: any) => {
               return item._id !== action.payload.queryParams.params._id;
           })]
         })
       }
       case MainActions.CREATE_DATA_SUCCESS: {
         return Object.assign({}, state, {
           dataArray: [...state.dataArray, action.payload]
         })
       }

       case MainActions.LOGOUT_SUCCESS: {
         return Object.assign({}, intitialState)
       }
       default: {
         return <IDatasState>state;
       }
     }
 };
