import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from '@app/shared/models/todos/todos.model';
import { Location } from '@angular/common';
import { TodosStoreService } from '@app/features/todos/store/todos-store.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { tap, takeUntil, take, map } from 'rxjs/operators';
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

  ngOnInit() {
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
    this._todosStore.findById({_id: id}).pipe(
      tap(todo => console.log(todo)),
      tap((todo) => (todo)
        ? this.form.patchValue(todo)
        : null
      ),
      tap(() => console.log(this.form.value))
    )
    .toPromise();
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
