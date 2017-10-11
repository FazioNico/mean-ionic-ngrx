/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   09-10-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';

/**
 * Main Abstract Provider for Apollo Client
 * This will implemented by each module.service using Apollo Client.
 */
@Injectable()
export abstract class ApolloServiceProvider {

  /**
   * Thises propretyies need to be implemented by child providers
   */
  protected abstract readonly queryList:any;
  protected abstract readonly mutationCreate:any;
  protected abstract readonly mutationUpdate:any;
  protected abstract readonly mutationDelete:any;
  protected abstract readonly subscriptionAdded:any;

  constructor(public apollo: Apollo) {
  }

  /**
   * Apollo watchQuery to get Observable collection data
   */
  protected get():Observable<any>{
    return this.apollo.watchQuery({
      query: this.queryList
    })
    .map(res=> res.data)
  }

  /**
   * Apollo mutate to creat new item.
   */
  protected post(newItem:any):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationCreate,
      variables: newItem
    })
    .map(res=> res.data)
  }

  /**
   * Apollo mutate to update item.
   */
  protected put(updatedItem:any):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationUpdate,
      variables: updatedItem
    })
    .map(res=> res.data)
  }

  /**
   * Apollo mutate to delete an item
   */
  protected delete(_id:string):Observable<any>{
    return this.apollo.mutate({
      mutation: this.mutationDelete,
      variables: {id:_id}
    })
    .map(res=> res.data)
  }

  /**
   * Apollo Subscription to get each item addedd
   * ::: Currently not working :::
   * Start Observable data on item added (realTime database)
   */
  protected subscribAdded():Observable<any>{
    return this.apollo.subscribe({
      query:this.subscriptionAdded
    })
  }
}
