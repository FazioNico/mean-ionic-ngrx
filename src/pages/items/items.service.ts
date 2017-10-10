/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
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
/*
  Generated class for the ApolloServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsService extends ApolloServiceProvider{

  public readonly queryList:any;
  public readonly mutationCreate:any;
  public readonly mutationUpdate:any;
  public readonly mutationDelete:any;

  constructor(public apollo: Apollo) {
    super(apollo);
    // implement all abstract propretyies
    // => init all GraphQL Document Query & Mutation Options
    this.queryList = typeDefs.TodosList
    this.mutationCreate = typeDefs.TodoCreate
    this.mutationUpdate = typeDefs.TodoUpdate
    this.mutationDelete = typeDefs.TodoDelete
  }

  get():Observable<ITodo[]>{
    return super.get()
                // use parent class methode and format output and add type
                .map((data:QueryResponse) => data.todos)
  }

  post(newTodo:ITodo):Observable<ITodo>{
    return super.post(newTodo)
                .map((data:MutationCreateResponse) => data.addTodo)
  }

  put(todo:ITodo):Observable<ITodo>{
    return super.put(todo)
                .map((data:MutationUpdateResponse) => data.updateTodo)
  }

  delete(_id:string):Observable<{_id:string}>{
    return super.delete(_id)
                .map((data:MutationDeleteResponse) => data.deleteTodo)
  }

}
