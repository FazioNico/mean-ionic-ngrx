import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './auth.effects';
import * as fromAuthCheck from '@app/features/auth/store/auth.reducer';
import * as fromCurrentUser from './currentUser.reducer';
import { AuthStoreService } from './auth-store.service';
import { AuthService } from '@app/features/auth/services/auth.service';

 @NgModule({
   imports: [
     StoreModule.forFeature('currentUser', fromCurrentUser.reducer),
     StoreModule.forFeature('authCheck', fromAuthCheck.reducer),
     StoreDevtoolsModule.instrument(),
     EffectsModule.forFeature([AuthEffects])
   ],
   exports: [StoreModule, EffectsModule],
   providers: [
     AuthService,
     AuthStoreService
    ]
 })
 export class AuthStoreModule {}
