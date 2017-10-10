/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-10-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

/*
  Generated class for the ApolloServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export abstract class ApolloServiceProvider {

  public abstract readonly queryList:any;
  public abstract readonly mutationCreate:any;
  public abstract readonly mutationUpdate:any;
  public abstract readonly mutationDelete:any;

  constructor(public apollo: Apollo) {
  }

  get():Observable<any>{
    return this.apollo.watchQuery({
      query: this.queryList
    })
    .map(res=> res.data)
  }

  post(newItem:any):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationCreate,
      variables: newItem
    })
    .map(res=> res.data)
  }

  put(updatedItem:any):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationUpdate,
      variables: updatedItem
    })
    .map(res=> res.data)
  }

  delete(_id:string):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationDelete,
      variables: {id:_id}
    })
    .map(res=> res.data)
  }
}
