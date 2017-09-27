/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
 */

import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';

/**
 * Add Todo to Todos Actions
 */
@Injectable()
export class MainActions {

  static ERROR_DISPLAY:string = 'ERROR_DISPLAY';
  static ERROR_DISPLAYED:string = 'ERROR_DISPLAYED';
  static ERROR_DISPLAY_FAILED:string = 'ERROR_DISPLAY_FAILED';
  static ERROR_CLEAN:string = 'ERROR_CLEAN';


}
