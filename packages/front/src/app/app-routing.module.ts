import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoGuard } from '@app/core/services/auth-guard/no-guard.service';
import { AuthGuard } from '@app/core/services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  {
    path: 'index',
    loadChildren: 'app/features/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: 'app/features/auth/auth.module#AuthModule',
    canActivate: [NoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
