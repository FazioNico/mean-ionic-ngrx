import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosPageComponent } from '@app/features/todos/containers/todos-page/todos-page.component';
import { EditItemPageComponent } from '@app/features/todos/containers/edit-item-page/edit-item-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TodosPageComponent
      },
      {
        path: ':id',
        component: EditItemPageComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
