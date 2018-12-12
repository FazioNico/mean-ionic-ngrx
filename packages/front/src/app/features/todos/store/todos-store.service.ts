/**
* @Author: Nicolas Fazio <FazioNico>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   FazioNico
 * @Last modified time: 13-11-2017
*/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppStoreService } from '@app/@store/app.store.service';
import { AppState } from '@app/@store/app.state';
import * as items from '@app/features/todos/store/todos.actions';
import { ITodosState } from '@app/features/todos/store/todos.state';
import { map } from 'rxjs/operators';
import { Todo, ITodo } from '@app/shared/models/todos/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodosStoreService extends AppStoreService {

  protected readonly STATE = 'todos';

  constructor(
    protected store: Store<AppState & {todos: ITodosState}>
  ) { super(); }

  dispatchLoadAction(params: any) {
    this.dispatchAction(new items.LoadAction(params));
  }

  dispatchCreateAction(record: {description: string}) {
    this.dispatchAction(new items.CreateAction(record));
  }

  dispatchUpdateAction(record: ITodo)  {
    this.dispatchAction(new items.UpdateAction(record));
  }

  dispatchRemoveAction(id: string) {
    this.dispatchAction(new items.RemoveAction(id));
  }

  dispatchErrorAction(error: {message: string}) {
    this.dispatchAction(new items.ErrorAction(error));
  }

  // Accessor sample of how to select piece of the state
  getTodos(): Observable<ITodo[]> {
    return this.storeSelectFeatureState().pipe(
      map((state: ITodosState) => state)
    );
  }

  findById(record: {_id: string}): Observable<ITodo> {
    return this.getTodos().pipe(
      map((state: ITodosState) => state.find((item: ITodo) => item._id === record._id))
    );
  }

}
