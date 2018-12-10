import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosPageComponent } from './containers/todos-page/todos-page.component';
import { SharedModule } from '@app/shared/shared.module';
import { TodosStoreModule } from './store/todos-store.module';
import { TodosService } from './services/todos/todos.service';
import { TodosI18nModule } from '@app/features/todos/i18n/todos-i18n.module';

@NgModule({
  declarations: [TodosPageComponent],
  imports: [
    TodosRoutingModule,
    TodosStoreModule,
    TodosI18nModule,
    SharedModule
  ],
  providers: [TodosService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodosModule { }
