/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   26-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
*/

import { ItemsActions, TItemsActions } from './items.actions';
import { ITodo, IItemsState, intitialState /*, adapter*/ } from "./items.state";

export function reducer (
  state:IItemsState = intitialState,
  action:TItemsActions
):IItemsState {
  switch (action.type) {
    case ItemsActions.LOAD: {
      return Object.assign([], state)
    }
    case ItemsActions.LOAD_SUCCESS: {
      //return adapter.addMany(action.payload, state)
      return Object.assign([], [...action.payload])
    }
    case ItemsActions.UPDATE_SUCCESS: {
      return Object.assign([], [...state.map((item:ITodo) => {
        return item._id === action.payload._id ? action.payload : item;
      })
    ])}
    case ItemsActions.REMOVE_SUCCESS: {
      return Object.assign([], [...state.filter((item: ITodo) => {
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
