/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   17-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-10-2017
 */

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { LoginService } from "./login.service";
import { AuthStoreModule } from "./store/auth-store.module";
import { LoginI18nModule } from "./i18n/login-i18n.module";

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    LoginI18nModule,
    AuthStoreModule,
    IonicPageModule.forChild(Login),
  ],
  providers: [LoginService],
  exports: [Login]
})
export class LoginModule {}
