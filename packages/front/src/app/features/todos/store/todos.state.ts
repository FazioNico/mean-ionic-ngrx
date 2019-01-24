import { Todo } from '@app/shared/models/todos/todos.model';

export interface ITodosState extends Array<Todo> {}
export const intitialState: ITodosState = [];
