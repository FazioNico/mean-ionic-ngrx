/**
* @Author: Nicolas Fazio <FazioNico>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   FazioNico
 * @Last modified time: 21-10-2017
*/
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from '@app/@i18n/i18n.service';

@Injectable({providedIn: 'root'})
export class HomeI18nService extends I18nService {

  constructor(
    public translate: TranslateService
  ) {
    super();
  }

}
