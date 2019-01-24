import { ItemsActions, TItemsActions, LoadSuccessAction, UpdateSuccessAction, RemoveSuccessAction } from './todos.actions';
import { intitialState, ITodosState} from './todos.state';
import { Todo } from '@app/shared/models/todos/todos.model';

export function reducer (
  state: ITodosState = intitialState,
  action: TItemsActions
): ITodosState {
  switch (action.type) {
    case ItemsActions.LOAD: {
      return Object.assign([], state);
    }
    case ItemsActions.LOAD_SUCCESS:
      const { payload: {todos = null} = {} } = <LoadSuccessAction>action;
      return Object.assign([], [...todos]);

    case ItemsActions.UPDATE_SUCCESS:
      const { payload: {todo: updated = null} = {} } = <UpdateSuccessAction>action;
      return Object.assign([], [...state.map((item: Todo) => {
        return item._id === updated._id ? updated : item;
      })
    ]);

    case ItemsActions.REMOVE_SUCCESS:
      const { payload: {todo: removed = null} = {} } = <RemoveSuccessAction>action;
      return Object.assign([], [...state.filter((item: Todo) => {
        return item._id !== removed._id;
      })]
    );

    case ItemsActions.CREATE_SUCCESS:
      const { payload: {todo: newItem = null} = {} } = <RemoveSuccessAction>action;
      return Object.assign([], [...state, newItem]);

    case 'LOGOUT_SUCCESS':
      return Object.assign([], intitialState);

    default:
      return <ITodosState>state;
  }
}
