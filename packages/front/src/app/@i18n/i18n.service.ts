import { TranslateService } from '@ngx-translate/core';

export interface ILocale {
   lang: string;
   data: Object;
}

export abstract class I18nService {
  public translate: TranslateService;
  public loadTranslations(...args: ILocale[]): void {
     const locales = [...args];
     locales.forEach( (locale) => {
       /*
         use setTranslation() with the third argument set to true to append
         translations instead of replacing them
       */
       this.translate.setTranslation(locale.lang, locale.data, true);
     });
   }
}
