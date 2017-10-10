/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

 import { Action } from '@ngrx/store';

 export class NgRxAction<T> implements Action {
   readonly type: string;
   constructor(public payload?: T) {}
 }
