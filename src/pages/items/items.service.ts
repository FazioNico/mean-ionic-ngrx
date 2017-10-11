/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
 */

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { ApolloServiceProvider } from "../../providers/apollo-service/apollo-service";
import * as typeDefs from "./items.gql";

import { ITodo } from "./store/items.state";

interface QueryResponse{
  todos:ITodo[]
}
interface MutationUpdateResponse{
  updateTodo:ITodo
}
interface MutationCreateResponse{
  addTodo:ITodo
}
interface MutationDeleteResponse{
  deleteTodo:{_id:String}
}
interface SubscriptionAddedResponse{
  todoAdded:ITodo
}

/**
 * This Provider extends from ApolloServiceProvider
 * for using generic super() propretyies & CRUD methodes.
 *
 * Just need to implement all abstract propretyies with
 * the right TypeDefs inside the constructor()
 * Then extend each methodes with super.METHODE_TO_EXTEND()
 * to format output and add type.
 */
@Injectable()
export class ItemsService extends ApolloServiceProvider{

  protected readonly queryList:any;
  protected readonly mutationCreate:any;
  protected readonly mutationUpdate:any;
  protected readonly mutationDelete:any;
  protected readonly subscriptionAdded:any;

  constructor(public apollo: Apollo) {
    // use super() to enable extending class
    super(apollo);
    // implement all abstract propretyies
    // => init all GraphQL Document Query & Mutation Options
    this.queryList = typeDefs.TodosList
    this.mutationCreate = typeDefs.TodoCreate
    this.mutationUpdate = typeDefs.TodoUpdate
    this.mutationDelete = typeDefs.TodoDelete
    this.subscriptionAdded = typeDefs.TodoAdded
  }

  /**
   * Apollo watchQuery to get Observable collection data
   * @return {Observable<Collection>}
   */
  get():Observable<ITodo[]>{
    // do not forguet to return extended methode!
    return super.get()
                // use parent class methode and format output and add type
                .map((data:QueryResponse) => data.todos)
  }

  /**
   * Apollo mutate to creat new item.
   * @param  {any} [object item to create]
   * @return {Observable<any>} [Return new item created]
   */
  post(newTodo:ITodo):Observable<ITodo>{
    return super.post(newTodo)
                .map((data:MutationCreateResponse) => data.addTodo)
  }

  /**
   * Apollo mutate to update item.
   * @param  {any}  [object item to update need an $id]
   * @return {Observable<any>} [Return item updated ]
   */
  put(todo:ITodo):Observable<ITodo>{
    return super.put(todo)
                .map((data:MutationUpdateResponse) => data.updateTodo)
  }

  /**
   * Apollo mutate to delete an item
   * @param  {_id:string} [object with item $id to delete]
   * @return {Observable<{_id:string}>}     [Return object with item $id deleted]
   */
  delete(_id:string):Observable<{_id:string}>{
    return super.delete(_id)
                .map((data:MutationDeleteResponse) => data.deleteTodo)
  }

  /**
   * Apollo Subscription to get each item addedd
   * ::: Currently not working :::
   * Start Observable data on Todo added (realTime database)
   */
  subscribAdded():Observable<any>{
    return super.subscribAdded()
                .map((data:any)=> {
                  console.log('---->', data)
                  return data.todoAdded
                })
  }

}
