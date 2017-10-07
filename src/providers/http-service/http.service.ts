/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";

const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the HttpService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export  class HttpService {

  private apiEndPoint:string;
  public path:string = '';
  private storage:any;

  constructor(
    public http: Http,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this.apiEndPoint = this.envVariables.apiEndpoint
  }

  get():Observable<any>{
    this.checkStorage();
    // Define Heders request
    let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': this.storage});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    // post request
    return this.http.get(`${this.apiEndPoint}${this.path}`, options)
                    .map(res => this.extractData(res))
  }

  post(body:any):Observable<any>{
    this.checkStorage();
    let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': this.storage, 'Content-Type': 'application/json'});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(`${this.apiEndPoint}${this.path}`, JSON.stringify(body), options)
                    .map(res => this.extractData(res)) // return response as json
  }

  put(body:any):Observable<any>{
    this.checkStorage();
    let url:string = `${this.apiEndPoint}${this.path}/${body._id}`; //see mdn.io/templateliterals
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    return this.http.put(url, JSON.stringify(body), options)
                    .map(res => this.extractData(res))
  }

  delete(_id:string):Observable<any>{
    this.checkStorage();
    let url:string =`${this.apiEndPoint}${this.path}/${_id}`;
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    let options:RequestOptions = new RequestOptions({ headers: headers });
    return this.http.delete(url, options)
                    .map(res => this.extractData(res))
  }


  getMock(_params):Observable<any> {
    let datas:any[] = [
      {
        _id: 1,
        description: 'first',
        isComplete: true,
        deadline: Date.now(),
        date: Date.now()
      },
      {
        _id: 2,
        description: 'seconde',
        isComplete: false,
        deadline: Date.now(),
        date: Date.now()
      }
    ];
    return Observable.of(datas);
  }

  /* Check if localstorage exist with datas */
  checkStorage():void|Observable<any>{
    this.storage = JSON.parse(localStorage.getItem(STORAGE_ITEM))
    // if storage not found
    if(!this.storage){
      return {} as Observable<{}>
    }
  }

  /* Methode to formate data output */
  extractData(res: any):any {
    let body = res.json();
    //return body.data || { };
    return body || {};
  }
}
