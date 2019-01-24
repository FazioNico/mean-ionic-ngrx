import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from '@app/@i18n/i18n.service';

@Injectable()
export class AuthI18nService extends I18nService {

  constructor(
    public translate: TranslateService
  ) { super(); }

}
