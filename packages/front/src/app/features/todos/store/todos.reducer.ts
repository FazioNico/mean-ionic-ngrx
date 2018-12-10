/**
* @Author: Nicolas Fazio <FazioNico>
* @Date:   26-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   FazioNico
 * @Last modified time: 16-10-2017
*/

import { ItemsActions, TItemsActions } from './todos.actions';
import { ITodo, IItemsState, intitialState /*, adapter*/ } from './todos.state';

export function reducer (
  state: IItemsState = intitialState,
  action: TItemsActions
): IItemsState {
  switch (action.type) {
    case ItemsActions.LOAD: {
      return Object.assign([], state);
    }
    case ItemsActions.LOAD_SUCCESS: {
      // return adapter.addMany(action.payload, state)
      return Object.assign([], [...action.payload.todos]);
    }
    case ItemsActions.UPDATE_SUCCESS: {
      return Object.assign([], [...state.map((item: ITodo) => {
        return item._id === action.payload.todo._id ? action.payload.todo : item;
      })
    ]);
    }
    case ItemsActions.REMOVE_SUCCESS: {
      return Object.assign([], [...state.filter((item: ITodo) => {
        return item._id !== action.payload.todo._id;
      })]
    );
    }
    case ItemsActions.CREATE_SUCCESS: {
      return Object.assign([], [...state, action.payload.todo]);
    }

    case 'LOGOUT_SUCCESS': {
      return Object.assign([], intitialState);
    }
    default: {
      return <IItemsState>state;
    }
  }
}
