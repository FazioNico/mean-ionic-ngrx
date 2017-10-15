/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-10-2017
 */

import { Component, Inject, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITodo } from "../items/store/items.state";

import 'rxjs/add/operator/map';

import { ItemsStoreService } from '../items/store/items-store.service';
import { canEnterIfAuthenticated } from '../../decorators';

@canEnterIfAuthenticated
@IonicPage({
  name: 'ItemEditPage',
  segment: 'items/:id',
  defaultHistory: ['ItemsPage']
})
@Component({
  selector: 'page-item-edit',
  templateUrl: 'item-edit.html',
})
export class ItemEdit {

  private updatedState:boolean = false;
  private todo:ITodo;
  private form: FormGroup;
  private todoDate:string; // date as a string value in ISO format

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private fb: FormBuilder,
    @Inject(ItemsStoreService) private readonly itemsStore:ItemsStoreService,
    public injector: Injector // required to use @canEnterIfAuthenticated
  ) {
    // get todo item from navParams
    this.todo = this.navParams.get('todo')
    if(this.todo){
        // converting todo.deadline to IOS Format for the Ionic DatePicker input
        this.todoDate = new Date(+this.todo.deadline).toISOString()
        // create a FormGroup to edit todo with todo datas
        this.form = fb.group({
            description: [this.todo.description, Validators.minLength(2)],
            isComplete: [this.todo.isComplete, Validators.required],
            deadline: [this.todoDate, Validators.required],
            expire: [this.todo.expire, Validators.required]
          });
    }
    else {
      // TODO: datas NOT in navParams:
      /* Now we have two solution:
            1: - get data item with service.load() by using navParams id
                 if existe else using  URL last params after /
               - add async pipe in html
               - add Elvis operator
            2: - kick user in root app if navParams in empty
               - add Elvis operator
      */
      // Solution 2: kick user in root page app
      // create a empty form
      this.form = fb.group({
          description: ['', Validators.minLength(2)],
          isComplete: ['', Validators.required],
          deadline: ['', Validators.required],
          expire: ['', Validators.required]
        });
      // then kick user
      console.log('kick user')
      this.navCtrl.setRoot('ItemsPage')
    }
  }

  saveTodo():void{
    // use the form datas
    let updated:ITodo = this.form.value
    // convert new ISO Date to timestampe (number) to store into our bdd
    let newDate:number = new Date(updated.deadline).getTime()
    // add ID param to the updated todo
    updated._id = this.todo._id
    // add convert ISO Date format to the param deadline
    updated.deadline = newDate
    // then send the todo ready to todoService
    this.itemsStore.dispatchUpdateAction(updated)
    this.navCtrl.pop()
  }

  deleteTodo():void{
    // use item ID
    this.itemsStore.dispatchRemoveAction(this.todo._id)
    // pop() navigation
    this.navCtrl.pop()
  }

  cancel():void{
    // pop() navigation
    this.navCtrl.pop()
  }

  toogleClick():void{
    //console.log(this.form.value.expire)
  }

}
