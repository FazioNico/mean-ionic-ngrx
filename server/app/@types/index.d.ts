/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-12-2016
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
 */

/// <reference path="./es6-promise/es6-promise.d.ts" />
/// <reference path="./bcryptjs/bcryptjs.d.ts" />

interface AsyncIterator<T> {
  next(value?: any): Promise<IteratorResult<T>>;
  return?(value?: any): Promise<IteratorResult<T>>;
  throw?(e?: any): Promise<IteratorResult<T>>;
}
