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

import { HomeI18nService } from "./home-i18n.service";
import { locale as english } from './langues/home.en';
import { locale as french } from './langues/home.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [HomeI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class HomeI18nModule {
  constructor(
    private translationLoader: HomeI18nService
  ){
      this.translationLoader.loadTranslations(english, french);
  }
}
