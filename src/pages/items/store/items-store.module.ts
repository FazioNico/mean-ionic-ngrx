/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

 import { NgModule } from '@angular/core';
 import { EffectsModule } from '@ngrx/effects';
 import { StoreModule } from '@ngrx/store';
 import { StoreDevtoolsModule } from '@ngrx/store-devtools';

 import { ItemsStoreService } from './items-store.service';
 import { ItemsEffects } from './items.effects';
 import { reducer } from './items.reducer';

 // import TaskStoreModule in the TaskModule
 @NgModule({
   imports: [
     StoreModule.forFeature('datasArray', reducer),
     StoreDevtoolsModule.instrument(),
     EffectsModule.forFeature([ItemsEffects])
   ],
   exports: [StoreModule, EffectsModule],
   providers: [ItemsStoreService]
 })
 export class ItemsStoreModule {}
