/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { MainActions } from '../../store/actions/mainActions';
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
  templateUrl: 'items.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Items implements OnInit{

  public storeInfo:Observable<AppStateI>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<any>,
    private mainActions: MainActions
  ) {
    // use the object in the template since it is an observable
    this.storeInfo = this.store.select(state => state.dataArray)
  }

  ngOnInit():void {
    this.doQuery()
  }

  /* Event Methode */
  toggleComplete(todo:any):void {
    todo.isComplete = !todo.isComplete;
    //this.todoService.update(todo)
  }

  deleteTodo(todo:any):void {
    //console.log('delete todo-> ', todo)
    //this.todoService.delete(todo._id)
  }

  navToEdit(todo:any):void {
    console.log(todo)
    // this.navCtrl.push('item-edit', {
    //   id: todo._id,
    //   todo: todo
    // })
  }

  /* Core Methode */
  doQuery():void {
    this.store.dispatch(<Action>this.mainActions.get_data_array('/todos'));
  }


}
