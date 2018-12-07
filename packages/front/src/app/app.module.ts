import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule, ToastController } from '@ionic/angular';
// Import ngrx Tools
import { NgRxStoreModule } from './@store/app.store.module';
// Import i18n translate module
import { I18nModule} from './@i18n/i18n.module';
import { CoreModule } from '@app/core/core.module';

const PROVIDERS = [
  ToastController
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    NgRxStoreModule,
    I18nModule,
    IonicModule.forRoot(),
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
