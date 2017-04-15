/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-04-2017
 */

import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';

/**
 * Add Todo to Todos Actions
 */
@Injectable()
export class MainActions {

  static GET_DATAS_ARRAY:string = 'GET_DATAS_ARRAY'
  static GET_DATAS_ARRAY_SUCCESS:string = 'GET_DATAS_ARRAY_SUCCESS'
  static GET_DATAS_ARRAY_FAILED:string = 'GET_DATAS_ARRAY_FAILED'

  static GET_DATA_OBJECT:string = 'GET_DATA_OBJECT'

  get_data_array(dbPath:string){
    return <Action>{
        type: MainActions.GET_DATAS_ARRAY,
        payload: { path: dbPath }
    }
  }
}
