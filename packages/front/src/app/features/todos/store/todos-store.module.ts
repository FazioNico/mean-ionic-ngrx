import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TodosStoreService } from './todos-store.service';
import { TodosEffects } from './todos.effects';
import { reducer } from './todos.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('todos', reducer),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forFeature([TodosEffects])
  ],
  exports: [StoreModule, EffectsModule],
  providers: [TodosStoreService]
})
export class TodosStoreModule {}
