
import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        // TODO: pass storage KEY with environement config
        Authorization: `${localStorage.getItem('authToken')}`
      }
    });
    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }

  public handleError = (error: Response) => {
    return throwError(error);
  }
}
