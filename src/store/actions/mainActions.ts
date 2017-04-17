/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-04-2017
 */

import {Injectable} from '@angular/core';
import { Action } from '@ngrx/store';
import { ITodo } from "../../providers/datas-service/datas-service";

/**
 * Add Todo to Todos Actions
 */
@Injectable()
export class MainActions {

  static GET_DATAS_ARRAY:string = 'GET_DATAS_ARRAY'
  static GET_DATAS_ARRAY_SUCCESS:string = 'GET_DATAS_ARRAY_SUCCESS'
  static GET_DATAS_ARRAY_FAILED:string = 'GET_DATAS_ARRAY_FAILED'

  static GET_DATA_OBJECT:string = 'GET_DATA_OBJECT'

  static UPDATE_DATA:string = 'UPDATE_DATA'
  static UPDATE_DATA_SUCCESS:string = 'UPDATE_DATA_SUCCESS'
  static UPDATE_DATA_FAILED:string = 'UPDATE_DATA_FAILED'

  static DELETE_DATA:string = 'DELETE_DATA'
  static DELETE_DATA_SUCCESS:string = 'DELETE_DATA_SUCCESS'
  static DELETE_DATA_FAILED:string = 'DELETE_DATA_FAILED'

  static CREATE_DATA:string = 'CREATE_DATA'
  static CREATE_DATA_SUCCESS:string = 'CREATE_DATA_SUCCESS'
  static CREATE_DATA_FAILED:string = 'CREATE_DATA_FAILED'

  get_data_array(dbPath:string):Action{
    return <Action>{
        type: MainActions.GET_DATAS_ARRAY,
        payload: { path: dbPath }
    }
  }

  update_data(_query:any):Action{
    return  <Action>{
        type: MainActions.UPDATE_DATA,
        payload: _query
    }
  }

  delete_data(_query:any):Action{
    return  <Action>{
        type: MainActions.DELETE_DATA,
        payload: _query
    }
  }

  create_data(_query:any):Action{
    return  <Action>{
        type: MainActions.CREATE_DATA,
        payload: _query
    }
  }
}
