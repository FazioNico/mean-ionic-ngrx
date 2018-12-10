import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosPageComponent } from '@app/features/todos/containers/todos-page/todos-page.component';

const routes: Routes = [
  {
    path: '',
    component: TodosPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
