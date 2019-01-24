import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthI18nService } from '@app/features/auth/i18n/auth-i18n.service';
import { locale as english } from '@app/features/auth/i18n/langues/login.en';
import { locale as french } from '@app/features/auth/i18n/langues/login.fr';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [AuthI18nService],
  exports: [TranslateModule] // do not forguet to export TranslateModule !!
})
export class AuthI18nModule {
  constructor(
    private translationLoader: AuthI18nService
  ) {
      this.translationLoader.loadTranslations(english, french);
  }
}
