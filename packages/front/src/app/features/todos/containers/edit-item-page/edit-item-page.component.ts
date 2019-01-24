import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo, Todo } from '@app/shared/models/todos/todos.model';
import { Location } from '@angular/common';
import { TodosStoreService } from '@app/features/todos/store/todos-store.service';
import { ActivatedRoute } from '@angular/router';
import { tap, take, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-item-page',
  templateUrl: './edit-item-page.component.html',
  styleUrls: ['./edit-item-page.component.css']
})
export class EditItemPageComponent implements OnInit {

  public form: FormGroup;
  public todo$: Observable<ITodo>;

  constructor(
    private _fb: FormBuilder,
    private _location: Location,
    private _todosStore: TodosStoreService,
    private _route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // build empty form
    this.form = this._fb.group({
      description: ['', Validators.minLength(2)],
      isComplete: ['', Validators.required],
      deadline: ['', Validators.required],
      expire: ['', Validators.required],
      _id: [''],
      uid: ['']
    });
    // get item ID from router
    const { id } = this._route.snapshot.params;
    if (!id) {
      return this._todosStore.dispatchErrorAction({message: 'No item ID found!'});
    }
    // Load todo data from store if existing
    // or do request to backend serve
    const todo = await this._todosStore.findById({_id: id}).pipe(
      take(1),
      tap((t) => (t)
        ? this.form.patchValue(t)
        : this._todosStore.dispatchLoadAction({path: `/${id}`})
      )
    )
    .toPromise().catch(err => err);
    if (todo instanceof Error) {
      this._todosStore.dispatchErrorAction(todo || {message: 'Unexisting Item'});
    }
    if (!todo) {
      // to request to backend server
      this.loadItem(id);
    }
  }

  async loadItem(id) {
    const todo = await this._todosStore.findById({_id: id}).pipe(
      debounceTime(1500),
      take(1),
      tap((t) => (t)
        ? this.form.patchValue(new Todo(t))
        : this._todosStore.dispatchLoadAction({path: `/${id}`})
      ),
    )
    .toPromise().catch(err => err);
    if (! todo || todo instanceof Error) {
      console.log('Error--->', todo);
      this._todosStore.dispatchErrorAction(todo || {message: 'Unexisting Item'});
    }
    return todo;
  }

  saveTodo(): void {
    // use the form datas
    const updated: ITodo = this.form.value;
    // convert new ISO Date to timestampe (number) to store into our bdd
    const newDate: number = (updated.deadline)
      ? new Date(updated.deadline).getTime()
      : new Date(Date.now()).getTime();
    // add ID param to the updated todo
    // updated._id = this.todo._id
    // add convert ISO Date format to the param deadline
    updated.deadline = newDate;
    // then send the todo ready to todoService
    this._todosStore.dispatchUpdateAction(updated);
    this._location.back();
  }
}
