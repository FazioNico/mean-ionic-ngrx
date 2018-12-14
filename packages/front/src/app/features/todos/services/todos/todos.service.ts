import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/shared/services/generic-http/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Todo } from '@app/shared/models/todos/todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService extends GenericHttpService {

  private readonly _todosUrl: string = '/todos';

  constructor(public http: HttpClient) {
    super(http);
  }

  get(params): Observable<{todos: Todo[]}> {
    // extract path params
    const { path = null } = params;
    // build url with existing path params
    const url = (path)
      ? this._todosUrl + path
      : this._todosUrl;
    // return request http
    return super.get(url).pipe(
      map(res => res || {}),
      catchError(res => throwError( {
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  put(data): Observable<{todo: Todo}> {
    return super.put(`${this._todosUrl}/${data._id}`, data ).pipe(
      map(res => res || {}),
      catchError(res => throwError({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  delete(data): Observable<{todo: Todo}> {
    return super.delete(`${this._todosUrl}/${data._id}`, data ).pipe(
      map(res => res || {}),
      catchError(res => throwError({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  post(data): Observable<{todo: Todo}> {
    return super.post(`${this._todosUrl}`, data ).pipe(
      map(res => res || {}),
      catchError(res => throwError({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }
}
