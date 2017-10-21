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

import { ItemsI18nService } from "./items-i18n.service";
import { locale as english } from './langues/items.en';
import { locale as french } from './langues/items.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [ItemsI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class ItemsI18nModule {
  constructor(
    private translationLoader: ItemsI18nService
  ){
      this.translationLoader.loadTranslations(english, french);
  }
}
