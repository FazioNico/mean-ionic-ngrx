/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-10-2017
*/

import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
// import native plugin
import { Globalization } from '@ionic-native/globalization';
// import ngx-translate tools
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Import ngx-translate config
import { availableLanguages, defaultLanguage } from "./i18n.config";

// create root translateLoader with HttpClient to load .json files
export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [Globalization]
})
export class I18nModule {
  constructor(
    platform: Platform,
    private globalization: Globalization,
    private translate: TranslateService
  ) {
    // detect platform ready ot use native plugin
    platform.ready().then(() => {
      this.initTranslator()
    });
  }

  initTranslator():void{
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(defaultLanguage);
    // check if cordova exist
    if ((<any>window).cordova) {
      // use native plugin
      this.useGlobalizationPlugin()
    } else {
      // use browser language
      let browserLanguage:string = this.translate.getBrowserLang() || defaultLanguage;
      // console.log('browserLanguage->',browserLanguage)
      const language = this.getSuitableLanguage(browserLanguage);
      this.translate.use(language);
    }
  }

  private useGlobalizationPlugin(){
    this.globalization.getPreferredLanguage().then(result => {
      var language = this.getSuitableLanguage(result.value);
      this.translate.use(language);
    });
  }

  private getSuitableLanguage(language:string):string {
    language = language.substring(0, 2).toLowerCase();
    // use Array.prototype.some():
    //    doc => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    return availableLanguages.some((x:{code:string}) => x.code == language) ? language : defaultLanguage;
  }

  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nModule,
      providers: [Globalization]
    }
  }
}
