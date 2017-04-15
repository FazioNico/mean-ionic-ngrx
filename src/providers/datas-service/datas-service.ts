/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { EnvVariables } from '../../app/environment/environment.token';
import { IEnvironment } from "../../../environments/env-model";

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
    //console.log('Firebase-> Load data as Array: ' , _params.path);
    return Observable.create((observer) => {
      this.http.get(`${this.apiEndPoint}${_params.path}`)
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
                       observer.next({ type: 'GET_FIREBASE_ARRAY_FAILED', payload: error })
                   });
    });
  }

}
