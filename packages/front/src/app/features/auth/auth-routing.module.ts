import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from '@app/features/auth/containers/auth-page/auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
