/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 21-10-2017
*/
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18nService } from "../../../i18n/i18n.service";

@Injectable()
export class LoginI18nService extends I18nService{

  constructor(
    public translate: TranslateService
  ) { super() }

}
