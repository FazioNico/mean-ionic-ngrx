import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as Todos from './todos.actions';
import { TodosService } from '../services/todos/todos.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodosEffects {

  constructor(
    private action$: Actions,
    private _database: TodosService
  ) {
  }

  @Effect() loadAction$ = this.action$.pipe(
      ofType(Todos.ItemsActions.LOAD),
      switchMap(() => this._database.get()),
      switchMap((result: any) => of(new Todos.LoadSuccessAction(result))),
      catchError((err: any) => of(new Todos.ErrorAction(err)))
  );

  @Effect() updateAction$ = this.action$.pipe(
      ofType(Todos.ItemsActions.UPDATE),
      switchMap((action: any) => this._database.put(action.payload)),
      switchMap((result: any) => of(new Todos.UpdateSuccessAction(result))),
      catchError(err => of(new Todos.ErrorAction(err)))

  );

  @Effect() removeAction$ = this.action$.pipe(
      ofType(Todos.ItemsActions.REMOVE),
      switchMap((action: any) => this._database.delete(action.payload)),
      switchMap(result => of(new Todos.RemoveSuccessAction(result))),
      catchError(err => of(new Todos.ErrorAction(err)))

  );

  @Effect() createAction$ = this.action$.pipe(
      ofType(Todos.ItemsActions.CREATE),
      switchMap((action: any) => this._database.post(action.payload)),
      switchMap((result: any) => of(new Todos.CreateSuccessAction(result))),
      catchError(err => of(new Todos.ErrorAction(err)))

  );

}
