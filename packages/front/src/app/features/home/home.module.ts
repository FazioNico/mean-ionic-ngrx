import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { HomeI18nModule } from './i18n/home-i18n.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    HomeRoutingModule,
    HomeI18nModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
