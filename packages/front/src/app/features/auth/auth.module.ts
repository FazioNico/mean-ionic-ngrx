import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './containers/auth-page/auth-page.component';
import { AuthStoreModule } from '@app/features/auth/store/auth-store.module';
import { AuthService } from '@app/features/auth/services/auth.service';
import { AuthI18nModule } from '@app/features/auth/i18n/auth-i18n.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    AuthRoutingModule,
    AuthStoreModule,
    AuthI18nModule,
    SharedModule
  ],
  providers: [
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
