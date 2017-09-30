/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   26-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
*/

import { Action } from "@ngrx/store";
import { ItemsActions, TItemsActions } from './items.actions';
import { ITodo, IItemsState, intitialState } from "./items.state";

export function reducer (
  state:IItemsState = intitialState,
  action:TItemsActions
):IItemsState {
  //console.log('ARRAY DATAS REDUCER-> ', action);
  switch (action.type) {
    case ItemsActions.LOAD: {
      return Object.assign([], state)
    }
    case ItemsActions.LOAD_SUCCESS: {
      return Object.assign([], [...action.payload])
    }
    case ItemsActions.UPDATE_SUCCESS: {
      return Object.assign([], [...state.map((item: any) => {
        return item._id === action.payload.response._id ? action.payload.response : item;
      })
    ])}
    case ItemsActions.REMOVE_SUCCESS: {
      return Object.assign([], [...state.filter((item: any) => {
        return item._id !== action.payload._id;
      })]
    )}
    case ItemsActions.CREATE_SUCCESS: {
      return Object.assign([], [...state, action.payload])
    }

    case 'LOGOUT_SUCCESS': {
      return Object.assign([], intitialState)
    }
    default: {
      return <IItemsState>state;
    }
  }
};
