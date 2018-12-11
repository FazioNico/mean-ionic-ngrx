/**
* @Author: Nicolas Fazio <FazioNico>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   FazioNico
 * @Last modified time: 05-01-2018
*/


import { NgRxAction } from '@app/@store/app.ngrx.actions';
import { ITodo, Todo } from '@app/shared/models/todos/todos.model';
import { ITodosState } from '@app/features/todos/store/todos.state';

/**
 * PATTERN DESIGN:
 * Simply add special word to your action definition.
 * Exemple:
 * - Using "Requested" to OPEN global application loader (modal spinner)
 * - Using "Success" to CLOSE global application loader (modal spinner)
 */
export const ItemsActions = {
  LOAD: '[Todo] LOAD Requested',
  LOAD_SUCCESS: '[Todo] LOAD Success',
  CREATE: '[Todo] CREATE Requested',
  CREATE_SUCCESS: '[Todo] CREATE Success',
  UPDATE: '[Todo] UPDATE Requested',
  UPDATE_SUCCESS: '[Todo] UPDATE Success',
  REMOVE: '[Todo] REMOVE Requested',
  REMOVE_SUCCESS: '[Todo] REMOVE Success',
  ERROR: '[Todo] Error'
};

export class LoadAction extends NgRxAction<any> { type = ItemsActions.LOAD; }
export class LoadSuccessAction extends NgRxAction<{todos: ITodo[]}> { type = ItemsActions.LOAD_SUCCESS; payload?: {todos: Todo[]}; }

export class CreateAction extends NgRxAction<any> { type = ItemsActions.CREATE; }
export class CreateSuccessAction extends NgRxAction<{todo: ITodo}> { type = ItemsActions.CREATE_SUCCESS; }

export class UpdateAction extends NgRxAction<any> { type = ItemsActions.UPDATE; }
export class UpdateSuccessAction extends NgRxAction<{todo: ITodo}> { type = ItemsActions.UPDATE_SUCCESS; }

export class RemoveAction extends NgRxAction<string> { type = ItemsActions.REMOVE; }
export class RemoveSuccessAction extends NgRxAction<{todo: ITodo}> { type = ItemsActions.REMOVE_SUCCESS; }

export class ErrorAction extends NgRxAction<any> { type = ItemsActions.ERROR; }

export type TItemsActions =
LoadAction | LoadSuccessAction |
CreateAction | CreateSuccessAction |
UpdateAction | UpdateSuccessAction |
RemoveAction | RemoveSuccessAction |
ErrorAction;
