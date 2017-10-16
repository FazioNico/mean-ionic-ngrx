/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 16-10-2017
*/


import { NgRxAction } from '../../../store/ngrx.actions';
import { ITodo, IItemsState } from "./items.state";

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
}

export class LoadAction extends NgRxAction<any> { type = ItemsActions.LOAD; }
export class LoadSuccessAction extends NgRxAction<IItemsState> { type = ItemsActions.LOAD_SUCCESS; }

export class CreateAction extends NgRxAction<any>{ type = ItemsActions.CREATE; }
export class CreateSuccessAction extends NgRxAction<ITodo> { type = ItemsActions.CREATE_SUCCESS; }

export class UpdateAction extends NgRxAction<any> { type = ItemsActions.UPDATE; }
export class UpdateSuccessAction extends NgRxAction<ITodo> { type = ItemsActions.UPDATE_SUCCESS; }

export class RemoveAction extends NgRxAction<string> { type = ItemsActions.REMOVE; }
export class RemoveSuccessAction extends NgRxAction<{_id:string}> { type = ItemsActions.REMOVE_SUCCESS; }

export class ErrorAction extends NgRxAction<any> { type = ItemsActions.ERROR; }

export type TItemsActions =
LoadAction | LoadSuccessAction |
CreateAction | CreateSuccessAction |
UpdateAction | UpdateSuccessAction |
RemoveAction | RemoveSuccessAction |
ErrorAction;
