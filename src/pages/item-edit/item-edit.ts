/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Store, Action } from '@ngrx/store'
import 'rxjs/add/operator/map';

import { MainActions } from '../../store/actions/mainActions';

import { ITodo } from '../../providers/datas-service/datas-service';

/**
 * Generated class for the ItemEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

  public updatedState:boolean = false;
  public todo:ITodo;
  public form: FormGroup;
  public todoDate:string; // date as a string value in ISO format

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private store: Store<any>,
    private mainActions: MainActions
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemEdit');
  }

  saveTodo():void{
    // use the form datas
    let updated = this.form.value
    // convert new ISO Date to timestampe (number) to store into our bdd
    let newDate = new Date(updated.deadline).getTime()
    // add ID param to the updated todo
    updated._id = this.todo._id
    // add convert ISO Date format to the param deadline
    updated.deadline = newDate
    // then send the todo ready to todoService
    this.store.dispatch(<Action>this.mainActions.update_data( { path: '/todos', params: updated} ));
    this.navCtrl.pop()
  }

  deleteTodo():void{
    // use item ID
    this.store.dispatch(<Action>this.mainActions.delete_data( { path: '/todos', params: this.todo} ));
    // pop() navigation
    this.navCtrl.pop()
  }

  cancel():void{
    // pop() navigation
    this.navCtrl.pop()
  }

  toogleClick(){
    console.log(this.form.value.expire)
  }

}
