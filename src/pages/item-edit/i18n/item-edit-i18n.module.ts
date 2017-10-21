/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-10-2017
*/

import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ItemEditI18nService } from "./item-edit-i18n.service";
import { locale as english } from './langues/item-edit.en';
import { locale as french } from './langues/item-edit.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [ItemEditI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class ItemEditI18nModule {
  constructor(
    private translationLoader: ItemEditI18nService
  ){
      this.translationLoader.loadTranslations(english, french);
  }
}
