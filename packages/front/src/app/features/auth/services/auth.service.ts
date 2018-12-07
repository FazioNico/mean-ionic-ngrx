import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable ,  of ,  from as fromPromise } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpService } from '@app/shared/services/http/http.service';

/*
Generated class for the AuthService provider.
See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/

export interface HttpServerResponse extends Response {
  message?: string;
  code?: number;
  token?: string;
  user?: any;
}

@Injectable()
export class AuthService extends HttpService {

  private readonly _authUrl: string = '/auth';
  private readonly _isAuthUrl: string = '/auth/isauth';
  private readonly _signUpUrl: string = '/auth/signin';

  constructor(public http: HttpClient) {
    super(http);
  }

  /**
   * Methode to deconnect user. Will trigge dellToken()
   */
  doLogout(): Observable<any> {
    return this.dellToken();
  }

  isAuth(loadUserData = false): Observable<any> {
    return super.get(this._isAuthUrl + (loadUserData ? '?loadUserData=true' : ''))
    .pipe(
      map(res => res || {}),
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Authentication failed!'
      }))
    );
  }

  /**
   * @param _creds Input form email & password
   */
  doAuth(_creds: {email: string, password: string} = {email: null, password: null}): Observable<HttpServerResponse> {
    // TODO: test _creds params and handle error
    return super.post(this._authUrl, {
      email: _creds.email,
      password: _creds.password
    })
    .pipe(
      catchError(res => of({
        error: res,
        message: (res.error || {}).message || res.message || 'Login authentication failed!'}
      ))
    );
  }

  doCreateUser(_payload: {email: string, password: string}): Observable<HttpServerResponse> {
    console.log('_payload', _payload);

    return super.post(this._signUpUrl, _payload)
    .pipe(
      catchError(err => of({
        error: err,
        message: err.message || 'Signup failed!'
      }))
    );
  }

  /**
   * Methode to remove token from localstorage
   * See doc from `HttpService`
   */
  dellToken(): Observable<void> {
    return super.dellToken();
  }
}
