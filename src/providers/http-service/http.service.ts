/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-11-2017
*/

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../app/environment/env-model";

import { deprecate } from "../../decorators";

const STORAGE_ITEM:string = 'authTokenTest';

/*
Generated class for the HttpService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export abstract class HttpService {

  private readonly apiEndPoint:string;
  public path:string = '';
  private storage:any;

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this.apiEndPoint = this.envVariables.apiEndpoint + '/rest'
  }

  protected get():Observable<any>{
    this.checkStorage();
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):'';

    // Define Heders request
    // new Headers({'cache-control': 'no-cache','x-access-token': this.storage})
    let headers:HttpHeaders = new HttpHeaders()
        .set('cache-control','no-cache')
        .set('x-access-token',this.storage)
    let options:any = { headers: headers }
    // post request
    return this.http.get(`${this.apiEndPoint}${this.path}`, options)
  }

  protected post(body:any):Observable<any>{
    this.checkStorage();
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):'';
    let headers:HttpHeaders = new HttpHeaders()
      headers
        .set('cache-control','no-cache')
        .set('x-access-token',this.storage)
    if(this.storage){

    }
    let options:any = { headers: headers };
    return this.http.post(`${this.apiEndPoint}${this.path}`, body, options)
  }

  protected put(body:any):Observable<any>{
    this.checkStorage();
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):'';

    let url:string = `${this.apiEndPoint}${this.path}/${body._id}`; //see mdn.io/templateliterals
    let headers:HttpHeaders = new HttpHeaders()
        .set('cache-control','no-cache')
        .set('x-access-token',this.storage)
    let options:any = { headers: headers };
    return this.http.put(url, JSON.stringify(body), options)
  }

  protected delete(_id:string):Observable<any>{
    this.checkStorage();
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):'';

    let url:string =`${this.apiEndPoint}${this.path}/${_id}`;
    let headers:HttpHeaders = new HttpHeaders()
        .set('cache-control','no-cache')
        .set('x-access-token',this.storage)
    let options:any = { headers: headers };
    return this.http.delete(url, options)
  }


  protected getMock(_params:any):Observable<any> {
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
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.storage = (token)?JSON.parse(token):null
    // if storage not found
    if(!this.storage){
      return Observable.of({});
    }
  }

  /* Methode to formate data output */
  @deprecate(`
    Now using Angular 5 with HttpClientModule.
    See Angular official doc for more infos:  https://angular.io/guide/http`)
  private extractData(res: any):any {
    let body = res.json();
    //return body.data || { };
    return body || {};
  }
}
