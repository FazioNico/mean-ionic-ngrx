/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-10-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 22-10-2017
*/

// See docs for Typescript @decorator
// => https://www.typescriptlang.org/docs/handbook/decorators.html
// => https://angular-2-training-book.rangle.io/handout/features/decorators.html
// => https://toddmotto.com/angular-decorators

import { AuthStoreService } from '../pages/login/store/auth-store.service';
import { Component, Injector } from '@angular/core';

import { EnvVariables } from '../app/environment/environment.token';
import { IEnvironment } from "../app/environment/env-model";
// @canEnterIfAuthenticated
// Do not forget to add Injector in class => public injector: Injector // required to use @canEnterIfAuthenticated
export function canEnterIfAuthenticated(target:Function) {
  target.prototype.ionViewCanEnter = function () {
    this.isAuth = this.injector.get(AuthStoreService).isAuthenticated()
    if(!this.isAuth){
      window.location.href = './'
    }
    return this.isAuth || true;
  }
}

// @deprecate('Please use other methode')
export function deprecate(message: string = '{name}') {
  return (instance:any, name:string, descriptor:any) => {
    var original = descriptor.value;
    var localMessage = message.replace('{name}', name);
    descriptor.value = function() {
      console.warn(`Function ${name} is deprecated: ${localMessage}`);
      return instance
    };
    return descriptor;
  };
}
