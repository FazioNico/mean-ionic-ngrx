/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

//import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

// import { AppStateI } from "../../store/app-stats";
// import { IDatasState} from "../../store/reducers/datasReducer";
// import { MainActions } from '../../store/actions/mainActions';

// import { IItemsState, ITodo } from "../../shared/store/items.state";
// import { DatasActions } from '../../shared/store/datas.actions';

import { IItemsState, ITodo } from "./store/items.state";
//import { ItemsActions, TItemsActions } from './store/items.actions';
import { ItemsStoreService } from './store/items-store.service';

// import { ITodo } from "../../providers/datas-service/datas-service";

/**
 * Generated class for the Items page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
    //private readonly store: Store<any>,
    // private readonly itemsActions: TItemsActions,
    private itemsStore:ItemsStoreService
  ) {
    // use the object in the template since it is an observable
    this.storeInfo = this.itemsStore.getTodos();
    //this.storeInfo = this.store.select(state => state.dataArray)
  }
  //
  ngOnInit():void {
    this.doQuery()
  }

  /* Event Methode */
  addTodo(todoInput:HTMLInputElement):void {
    this.itemsStore.dispatchCreateAction({description: todoInput.value})
    //this.store.dispatch(<Action>this.mainActions.create_data( { path: '/todos', params: todoInput.value} ));
    this.clearInput(todoInput);
  }

  toggleComplete(todo:ITodo):void {
    let updated = Object.assign({}, todo)
    updated.isComplete = !updated.isComplete
    this.itemsStore.dispatchUpdateAction(updated)
    //this.store.dispatch(<Action>this.mainActions.update_data( { path: '/todos', params: updated} ));
  }

  deleteTodo(todo:ITodo):void {
    this.itemsStore.dispatchRemoveAction(todo._id)
    //this.store.dispatch(<Action>this.mainActions.delete_data( { path: '/todos', params: todo} ));
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
    this.itemsStore.dispatchLoadAction({path:'/todos'})
    //this.store.dispatch(<Action>this.mainActions.get_data_array('/todos'));
  }

  clearInput(todoInput:HTMLInputElement):void{
    todoInput.value = '';
  }

}
