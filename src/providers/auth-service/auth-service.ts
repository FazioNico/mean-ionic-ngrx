/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

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
  // private _signUpUrl:string = "/signup"

  constructor(
    public http: Http,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this._apiEndPoint = this.envVariables.apiEndpoint
  }

  logoutUser(): void {

  }

  isAuth():Observable<any>{
    return Observable.create((observer) => {
      let storage:any = JSON.parse(localStorage.getItem(STORAGE_ITEM))
      // if storage not found
      if(!storage){
        observer.next({ type: MainActions.CHECK_AUTH_NO_USER })
      }
      // Define Heders request
      let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': storage.token});
      let options:RequestOptions = new RequestOptions({ headers: headers });
      // send request to Auth service
      this.http.get(`${this._apiEndPoint}${this._isAuthUrl}`, options)
               .map(res => res.json())
               .subscribe((result)=>{
                   if(result._id) {
                       observer.next({ type: MainActions.CHECK_AUTH_SUCCESS, payload: result })
                   }
                   // if no _id send event with default value // false
                   observer.next({ type: 'CHECK_AUTH_NO_USER' })
                 },
                 err => {
                   console.log(err)
                   observer.next({ type: MainActions.CHECK_AUTH_FAILED, payload: err })
                 }
               );
    })
  }

  doAuth(_creds) :Observable<any> {
    let headers:Headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options:RequestOptions = new RequestOptions({ headers: headers });

    let userReady:string = `email=${_creds.email}&password=${_creds.password}`;
    //console.log('UserReady-> ', userReady)
    // Post request with data & headers
    return Observable.create((observer) => {
       this.http.post(`${this._apiEndPoint}${this._authUrl}`, userReady, options)
                .map(res => res.json())
                .subscribe(result => {
                  if(result.success === true){
                    observer.next({ type: 'LOGIN_SUCCESS', payload: result })
                  }
                  else {
                    observer.next({ type: MainActions.LOGIN_FAILED, payload: result.message })
                  }
                },
                (error) => {
                    console.log(' ERROR: ' + error);
                    observer.next({ type: MainActions.LOGIN_FAILED, payload: error })
                })
                //.catch(this.handleError);
    })
  }

  doSignUp():void{

  }
  /* Methode to formate data output */
  extractData(res: Response):any {
      let body = res.json();
      //return body.data || { };
      return body || {};
  }

  /* Token managers Methodes */
  saveToken(providerResponse: any):Observable<any>  {
    //console.log(providerResponse)
    localStorage.setItem(STORAGE_ITEM, JSON.stringify(providerResponse));
    return Observable.create((observer) => {
      observer.next({ type: MainActions.TOKEN_SAVE_SUCCESS, payload: providerResponse })
    })
  }

  dellToken():Observable<any> {
    localStorage.removeItem(STORAGE_ITEM);
    return Observable.create((observer) => {
      observer.next({ type: MainActions.TOKEN_DELETE })
    })
  }
}
