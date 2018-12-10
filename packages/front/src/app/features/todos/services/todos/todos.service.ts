import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/shared/services/generic-http/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService extends GenericHttpService {

  private readonly _todosUrl: string = '/todos';

  constructor(public http: HttpClient) {
    super(http);
  }

  get(): Observable<any> {
    return super.get(this._todosUrl).pipe(
      map(res => res || {}),
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  put(data): Observable<any> {
    return super.put(`${this._todosUrl}/${data._id}`, data ).pipe(
      map(res => res || {}),
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  delete(data): Observable<any> {
    return super.delete(`${this._todosUrl}/${data._id}`, data ).pipe(
      map(res => res || {}),
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  post(data): Observable<any> {
    return super.post(`${this._todosUrl}`, data ).pipe(
      map(res => res || {}),
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }
}
