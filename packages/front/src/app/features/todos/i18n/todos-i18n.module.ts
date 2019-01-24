/**
* @Author: Nicolas Fazio <FazioNico>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   FazioNico
 * @Last modified time: 10-11-2018
*/

import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TodosI18nService } from '@app/features/todos/i18n/todos-i18n.service';
import { locale as english } from '@app/features/todos/i18n/langues/todos.en';
import { locale as french } from '@app/features/todos/i18n/langues/todos.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [TodosI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class TodosI18nModule {
  constructor(
    private translationLoader: TodosI18nService
  ) {
      this.translationLoader.loadTranslations(english, french);
  }
}
