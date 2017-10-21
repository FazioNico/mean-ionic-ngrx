/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-10-2017
*/

import { NgModule } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { LoginI18nService } from "./login-i18n.service";
import { locale as english } from './langues/login.en';
import { locale as french } from './langues/login.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [LoginI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class LoginI18nModule {
  constructor(
    private translationLoader: LoginI18nService
  ){
      this.translationLoader.loadTranslations(english, french);
  }
}
