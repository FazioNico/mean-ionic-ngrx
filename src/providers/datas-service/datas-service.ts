/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../../environments/env-model";

const STORAGE_ITEM:string = 'authTokenTest';

// define a Todo Interface to better usage
export interface ITodo {
  _id: string;
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
  user_id: string;
}

/*
  Generated class for the DatasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatasService {

  private apiEndPoint:string;

  constructor(
    public http: Http,
    @Inject(EnvVariables) public envVariables:IEnvironment
  ) {
    this.apiEndPoint = this.envVariables.apiEndpoint
  }

  getDatasArray(_params):Observable<any> {
    return Observable.create((observer) => {
      let storage:any = JSON.parse(localStorage.getItem(STORAGE_ITEM))
      // if storage not found
      if(!storage){
        observer.next({ type: 'GET_DATAS_ARRAY_FAILED' })
      }
      // Define Heders request
      let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': storage.token});
      let options:RequestOptions = new RequestOptions({ headers: headers });

      this.http.get(`${this.apiEndPoint}${_params.path}`, options)
               .map(response => response.json())
               .subscribe(
                  datas => {
                    observer.next({ type: 'GET_DATAS_ARRAY_SUCCESS', payload: datas })
                  },
                  (error) => {
                      console.log(' ERROR: ' + error);
                      observer.next({ type: 'GET_DATAS_ARRAY_FAILED', payload: error })
                  });
    })
  }

  getDatasArrayMock(_params):Observable<any> {
    let datas = [
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

    return Observable.create((observer) => {
      Observable.of(datas)
                .subscribe(
                   datas => {
                     observer.next({ type: 'GET_DATAS_ARRAY_SUCCESS', payload: datas })
                   },
                   (error) => {
                       console.log(' ERROR: ' + error);
                       observer.next({ type: 'GET_DATAS_ARRAY_FAILED', payload: error })
                   });
    });
  }

  // update item by ID
  update(_query:any):Observable<any> {

    let url:string = `${this.apiEndPoint}${_query.path}/${_query.params._id}`; //see mdn.io/templateliterals
    let body:string = JSON.stringify(_query.params)
    let headers:Headers = new Headers({'Content-Type': 'application/json'});
    let options:RequestOptions = new RequestOptions({ headers: headers });

    return Observable.create((observer) => {
      this.http.put(url, body, options)
               .map(response => response.json())
               .subscribe(
                   data => {
                      observer.next({ type: 'UPDATE_DATA_SUCCESS', payload: {response: data.response, queryParams:_query} })
                   },
                   (error:any) => {
                     // format data error
                     let msg:string = `${(error.statusText)? error.statusText + ' Could not update item' : 'Could not update item'}`
                     observer.next({ type: 'UPDATE_DATA_FAILED', payload: msg })
                   }
               ); // Eof subscribe
    });
  }

  // Delete Item by Id
  delete(_query):Observable<any> {
    //console.log('del', _query)
    let url:string =`${this.apiEndPoint}${_query.path}/${_query.params._id}`;
    let headers:Headers = new Headers({'Content-Type': 'application/json'});

    return Observable.create((observer) => {
      this.http.delete(url, headers)
               .subscribe(
                 (data:any) => {
                    observer.next({ type: 'DELETE_DATA_SUCCESS', payload: {response: data, queryParams:_query} })
                  },
                  (error) => {
                    let msg:string = `${(error.statusText)? error.statusText + ' Could not delete item' : 'Could not delete item'}`
                    observer.next({ type: 'DELETE_DATA_FAILED', payload: msg })
                  }
               );
    });
  }

  // add new item
  create(_query: any):Observable<any>  {
    return Observable.create((observer) => {

      let storage:any = JSON.parse(localStorage.getItem(STORAGE_ITEM))
      // if storage not found
      if(!storage){
        observer.next({ type: 'GET_DATAS_ARRAY_FAILED' })
      }
      // Define Heders request

      let body:string = JSON.stringify({description: _query.params});
      let headers:Headers = new Headers({'cache-control': 'no-cache','x-access-token': storage.token, 'Content-Type': 'application/json'});
      let options:RequestOptions = new RequestOptions({ headers: headers });

      // post request to server
      this.http.post(`${this.apiEndPoint}${_query.path}`, body, options)
               .map(response => response.json()) // return response as json
               .subscribe(
                  data => {
                    // assign new state to observable Todos Subject
                    observer.next({ type: 'CREATE_DATA_SUCCESS', payload: data })
                  },
                  (error) => {
                    let msg:string = `${(error.statusText)? error.statusText + ' Could not create item' : 'Could not create item'}`
                    observer.next({ type: 'CREATE_DATA_FAILED', payload: msg })
                  }
               );
    })
  }

}
