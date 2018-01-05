/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
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
  public tokentStorage:string = '';

  constructor(
    public http: HttpClient,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this.apiEndPoint = this.envVariables.apiEndpoint + '/rest'
  }

  protected get():Observable<any>{
    this.checkStorage();
    // Define Heders request
    let options:any = { headers: this.getHeaders() }
    // post request
    return this.http.get(`${this.apiEndPoint}${this.path}`, options)
  }

  protected post(body:any):Observable<any>{
    this.checkStorage();
    let options:any = { headers: this.getHeaders() }
    return this.http.post(`${this.apiEndPoint}${this.path}`, body, options)
  }

  protected put(body:any):Observable<any>{
    this.checkStorage();
    let url:string = `${this.apiEndPoint}${this.path}/${body._id}`; //see mdn.io/templateliterals
    let options:any = { headers: this.getHeaders() }
    return this.http.put(url, JSON.stringify(body), options)
  }

  protected delete(_id:string):Observable<any>{
    this.checkStorage();
    let url:string =`${this.apiEndPoint}${this.path}/${_id}`;
    let options:any = { headers: this.getHeaders() }
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
  private checkStorage():void{
    let token:string|null = localStorage.getItem(STORAGE_ITEM)
    this.tokentStorage = (token)?JSON.parse(token):'';
  }

  /*
  * Extendable methode to set Headers request.
  * Can be extended with more HttpHeaders
  * like this:
  *   let extendedHeaders = this.getHeaders()
  *                             .set(KEY,VALUE)
  *
  * or with extended class like this:
  *   getHeaders():HttpHeaders{
  *     return super.getHeaders().set(KEY,VALUE)
  *   }
  */
  getHeaders():HttpHeaders{
    return new HttpHeaders()
        .set('cache-control','no-cache')
        .set('x-access-token',this.tokentStorage)
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
