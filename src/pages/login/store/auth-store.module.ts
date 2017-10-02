/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   30-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 02-10-2017
 */

 import { NgModule } from '@angular/core';
 import { EffectsModule } from '@ngrx/effects';
 import { StoreModule } from '@ngrx/store';
 import { StoreDevtoolsModule } from '@ngrx/store-devtools';

 import { AuthEffects } from './auth.effects';
 import * as fromAuthCheck from './authChecked.reducer';
 import * as fromCurrentUser from './currentUser.reducer';
 import { AuthStoreService } from "./auth-store.service";

 // import TaskStoreModule in the TaskModule
 @NgModule({
   imports: [
     StoreModule.forFeature('currentUser', fromCurrentUser.reducer),
     StoreModule.forFeature('authCheck', fromAuthCheck.reducer),
     StoreDevtoolsModule.instrument(),
     EffectsModule.forFeature([AuthEffects])
   ],
   exports: [StoreModule, EffectsModule],
   providers: [AuthStoreService]
 })
 export class AuthStoreModule {}
