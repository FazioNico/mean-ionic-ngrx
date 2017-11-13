/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-11-2017
 */

import { Component, OnInit, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { IItemsState, ITodo } from "./store/items.state";
import { ItemsStoreService } from './store/items-store.service';

import { canEnterIfAuthenticated } from '../../decorators';

@canEnterIfAuthenticated
@IonicPage({
  name: 'ItemsPage',
  segment: 'items'
})
@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class Items implements OnInit{

  private readonly storeInfo:Observable<IItemsState>;

  constructor(
    private readonly navCtrl: NavController,
    private readonly navParams: NavParams,
    private itemsStore:ItemsStoreService,
    public injector: Injector // required to use @canEnterIfAuthenticated
  ) {
    // use the object in the template since it is an observable
    this.storeInfo = this.itemsStore.getTodos();
  }

  ngOnInit():void {
    this.doQuery()
  }

  /* Event Methode */
  addTodo(todoInput:HTMLInputElement):void {
    this.itemsStore.dispatchCreateAction({description: todoInput.value})
    this.clearInput(todoInput);
  }

  toggleComplete(todo:ITodo):void {
    let updated = Object.assign({}, todo)
    updated.isComplete = !updated.isComplete
    this.itemsStore.dispatchUpdateAction(updated)
  }

  deleteTodo(todo:ITodo):void {
    this.itemsStore.dispatchRemoveAction(todo._id)
  }

  navToEdit(todo:ITodo):void {
    console.log(todo)
    this.navCtrl.push('ItemEditPage', {
      id: todo._id,
      todo: todo
    })
  }

  /* Core Methode */
  doQuery():void {
    // Dispatch action to GraphQL API.
    // Params {path:string} is optional for GraphQL API but is require for REST API
    this.itemsStore.dispatchLoadAction({path:'/todos'})
  }

  clearInput(todoInput:HTMLInputElement):void{
    todoInput.value = '';
  }

}
