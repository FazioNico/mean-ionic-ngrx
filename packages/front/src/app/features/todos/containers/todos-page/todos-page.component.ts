import { Component, OnInit } from '@angular/core';
import { TodosStoreService } from '@app/features/todos/store/todos-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.css']
})
export class TodosPageComponent implements OnInit {

  public todos$: Observable<any[]>;
  constructor(
    private _todosStore: TodosStoreService
  ) { }

  ngOnInit() {
    this.todos$ = this._todosStore.getTodos();
    this._todosStore.dispatchLoadAction({path: '/todos'});
  }

  addTodo(todoInput: HTMLInputElement): void {
    // return console.log({description: todoInput.value});
    this._todosStore.dispatchCreateAction({description: todoInput.value});
    this.clearInput(todoInput);
  }

  toggleComplete(todo): void {
    const updated = Object.assign({}, todo);
    updated.isComplete = !updated.isComplete;
    this._todosStore.dispatchUpdateAction(updated);
  }

  deleteTodo(todo): void {
    this._todosStore.dispatchRemoveAction(todo._id);
  }

  clearInput(todoInput: HTMLInputElement): void {
    todoInput.value = '';
  }
}
