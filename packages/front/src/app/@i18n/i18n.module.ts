import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import ngx-translate tools
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Import ngx-translate config
import { availableLanguages, defaultLanguage, sysOptions } from './i18n.config';
// create root translateLoader with HttpClient to load .json files
export const translateLoaderFactory = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

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
  providers: [],
  exports: [
    TranslateModule
  ]
})
export class I18nModule {

  // guarantee that only one instance of Services is added to the root module
  // see => https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nModule,
      providers: []
    };
  }

  constructor(private translate: TranslateService) {
    this.initTranslator();
  }

  initTranslator(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(defaultLanguage);

    // use browser language
    const browserLanguage: string = this.translate.getBrowserLang() || defaultLanguage;
    const language = this.getSuitableLanguage(browserLanguage);
    // tslint:disable-next-line:no-console
    console.info('[i18n] browserLanguage:', language);
    this.translate.use(language);
    sysOptions.systemLanguage = language;

  }


  private getSuitableLanguage(language: string): string {
    language = language.substring(0, 2).toLowerCase();
    // use Array.prototype.some():
    //    doc => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    return availableLanguages.some( (x: {code: string}) => x.code === language) ? language : defaultLanguage;
  }

}
