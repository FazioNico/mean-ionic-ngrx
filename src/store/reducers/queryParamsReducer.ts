/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

 import { Action } from "@ngrx/store";
 import { MainActions } from '../actions/mainActions';

 export interface IqueryParamsState {
   queryParams:{
     path:string
     params?:Object
   };
 };

 export const intitialState:IqueryParamsState = {
   queryParams: {path: '/'}
 }

 export function reducer (state:IqueryParamsState = intitialState, action:Action):IqueryParamsState {
     //console.log('ARRAY DATAS REDUCER-> ', action);
     switch (action.type) {
       case MainActions.GET_DATAS_ARRAY: {
         return Object.assign({}, state, { queryParams: action.payload })
       }
       case MainActions.UPDATE_DATA: {
         return Object.assign({}, state, { queryParams: action.payload })
       }
       case MainActions.DELETE_DATA: {
         return Object.assign({}, state, { queryParams: action.payload })
       }
       case MainActions.CREATE_DATA: {
         return Object.assign({}, state, { queryParams: action.payload })
       }
       case MainActions.LOGOUT_SUCCESS: {
         return Object.assign({}, intitialState)
       }
       default: {
         return <IqueryParamsState>state;
       }
     }
 };
