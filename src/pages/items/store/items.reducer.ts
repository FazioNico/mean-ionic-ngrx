/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   26-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
 */

 import { Action } from "@ngrx/store";
 import { DatasActions } from '../../../shared/store/datas.actions';
 import { ITodo, IItemsState } from '../../../shared/store/items.state';

 export const intitialState:IItemsState = []

 export function reducer (state:IItemsState = intitialState, action:any):IItemsState {
     //console.log('ARRAY DATAS REDUCER-> ', action);
     switch (action.type) {
       case DatasActions.GET_DATAS_ARRAY: {
         return Object.assign([], state)
       }
       case DatasActions.GET_DATAS_ARRAY_SUCCESS: {
         return Object.assign([], [...action.payload])
       }
       case DatasActions.UPDATE_DATA_SUCCESS: {
         return Object.assign([], [...state.map((item: any) => {
              return item._id === action.payload.response._id ? action.payload.response : item;
            })
         ])
       }
       case DatasActions.DELETE_DATA_SUCCESS: {
         return Object.assign([], [...state.filter((item: any) => {
             return item._id !== action.payload.queryParams.params._id;
           })]
         )
       }
       case DatasActions.CREATE_DATA_SUCCESS: {
         return Object.assign([], [...state, action.payload])
       }

       case DatasActions.LOGOUT_SUCCESS: {
         return Object.assign([], intitialState)
       }
       default: {
         return <IItemsState>state;
       }
     }
 };
