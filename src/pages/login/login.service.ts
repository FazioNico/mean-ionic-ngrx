/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-10-2017
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpService } from "../../providers/http-service/http.service";
import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";
import { ICurrentUserState } from "./store/currentUser.reducer";
const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the AuthService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/

export interface HttpServerResponse extends Response {
  message?:string,
  success?:boolean,
  token?:string,
  user?:ICurrentUserState
}

@Injectable()
export class LoginService extends HttpService {

  private readonly _authUrl:string = "/auth"
  private readonly _isAuthUrl:string = "/isauth"
  private readonly _signUpUrl:string = "/signup"

  constructor(
    public http: Http,
    @Inject(EnvVariables) public readonly envVariables:IEnvironment
  ) {
    super(http,envVariables);
  }

  doLogout():Observable<any> {
    return this.dellToken()
  }

  isAuth():Observable<ICurrentUserState>{
    this.path = this._isAuthUrl
    return this.get()
  }

  doAuth(_creds:any) :Observable<HttpServerResponse> {
    this.path = this._authUrl
    return this.post({
      email:_creds.email,
      password: _creds.password
    })
  }

  doCreateUser(_payload):Observable<HttpServerResponse> {
    this.path = this._signUpUrl
    return this.post(_payload)
  }

  /* Token managers Methodes */
  saveToken(providerResponse: any):Observable<string>  {
    console.log(providerResponse)
    return Observable.fromPromise(
      Promise.resolve(localStorage.setItem(STORAGE_ITEM, JSON.stringify(providerResponse.token)))
      .then(_=> providerResponse.token)
      .catch(err => err)
    )
  }

  dellToken():Observable<any> {
    return Observable.fromPromise(
      Promise.resolve(localStorage.removeItem(STORAGE_ITEM))
    )
  }
}
