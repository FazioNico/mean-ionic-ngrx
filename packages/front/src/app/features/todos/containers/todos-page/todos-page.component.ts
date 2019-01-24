import { Component, OnInit } from '@angular/core';
import { TodosStoreService } from '@app/features/todos/store/todos-store.service';
import { Observable } from 'rxjs';
import { Todo, ITodo } from '@app/shared/models/todos/todos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit {

  public todos$: Observable<ITodo[]>;
  constructor(
    private _todosStore: TodosStoreService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.todos$ = this._todosStore.getTodos();
    this._todosStore.dispatchLoadAction();
  }

  addTodo(todoInput: HTMLInputElement): void {
    // return console.log({description: todoInput.value});
    this._todosStore.dispatchCreateAction({description: todoInput.value});
    this.clearInput(todoInput);
  }

  toggleComplete(todo: ITodo): void {
    const updated = new Todo(todo) ;
    updated.toggleState();
    this._todosStore.dispatchUpdateAction(updated);
  }

  deleteTodo(todo: ITodo): void {
    this._todosStore.dispatchRemoveAction(todo._id);
  }

  clearInput(todoInput: HTMLInputElement): void {
    todoInput.value = '';
  }

  navToEdit(todo: ITodo): void {
    console.log('go edit ', todo._id);
    this._router.navigate([`todos/${todo._id}`]);
  }
}
