/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { MainActions } from "../../store/actions/mainActions";

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../../environments/env-model";

const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the AuthService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private _apiEndPoint:string;
  private _authUrl:string = "/auth"
  private _isAuthUrl:string = "/isauth"
  private _signUpUrl:string = "/signup"

  constructor(
    public http: Http,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this._apiEndPoint = this.envVariables.apiEndpoint
  }

  doLogout():Observable<any> {
    return this.dellToken()
  }

  isAuth():Observable<{}|Response>{
    console.log('isAuth')
    let storage:any = JSON.parse(localStorage.getItem(STORAGE_ITEM))
    // if storage not found
    if(!storage){
      return Observable.of({})
    }
    let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': storage});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    // send request to Auth service
    return this.http.get(`${this._apiEndPoint}${this._isAuthUrl}`, options)
                    .map(res => res.json())
  }

  doAuth(_creds) :Observable<Response> {
    let headers:Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options:RequestOptions = new RequestOptions({ headers: headers });

    let userReady:string = `email=${_creds.email}&password=${_creds.password}`;
    return this.http.post(`${this._apiEndPoint}${this._authUrl}`, userReady, options)
                    .map(res => res.json())
  }

  doCreateUser(_payload):Observable<Response> {
    // Formate data as string
    let body:string = JSON.stringify(_payload);
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    // Post request with data & headers
    return this.http.post(`${this._apiEndPoint}${this._signUpUrl}`, body, options)
                    .map(res => res.json())
  }

  /* Methode to formate data output */
  extractData(res: Response):any {
    let body = res.json();
    //return body.data || { };
    return body || {};
  }

  /* Token managers Methodes */
  saveToken(providerResponse: any):Observable<string>  {
    //console.log(providerResponse.token)
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
