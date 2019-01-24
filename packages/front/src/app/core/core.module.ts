import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from '@app/core/services/auth-guard/auth-guard.service';
import { NoGuard } from '@app/core/services/auth-guard/no-guard.service';

const MODULES: any[] = [
  BrowserModule,
  HttpClientModule
];
const PROVIDERS: any[] = [
  AuthGuard,
  NoGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  exports: [
    ...MODULES,
  ],
  providers: [...PROVIDERS]
})
export class CoreModule { }
