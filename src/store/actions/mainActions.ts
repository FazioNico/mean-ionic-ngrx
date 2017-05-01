/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 01-05-2017
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

  static UPDATE_DATA:string = 'UPDATE_DATA'
  static UPDATE_DATA_SUCCESS:string = 'UPDATE_DATA_SUCCESS'
  static UPDATE_DATA_FAILED:string = 'UPDATE_DATA_FAILED'

  static DELETE_DATA:string = 'DELETE_DATA'
  static DELETE_DATA_SUCCESS:string = 'DELETE_DATA_SUCCESS'
  static DELETE_DATA_FAILED:string = 'DELETE_DATA_FAILED'

  static CREATE_DATA:string = 'CREATE_DATA'
  static CREATE_DATA_SUCCESS:string = 'CREATE_DATA_SUCCESS'
  static CREATE_DATA_FAILED:string = 'CREATE_DATA_FAILED'

  static LOGIN:string = "LOGIN";
  static LOGIN_SUCCESS:string = "LOGIN_SUCCESS";
  static LOGIN_FAILED:string = "LOGIN_FAILED";

  static LOGOUT:string = "LOGOUT";
  static LOGOUT_SUCCESS:string = "LOGOUT_SUCCESS";
  static LOGOUT_FAILED:string = "LOGOUT_FAILED";

  static CHECK_AUTH:string = 'CHECK_AUTH';
  static CHECK_AUTH_SUCCESS:string = 'CHECK_AUTH_SUCCESS';
  static CHECK_AUTH_FAILED:string = "CHECK_AUTH_FAILED";
  static CHECK_AUTH_NO_USER:string = 'CHECK_AUTH_NO_USER';

  static TOKEN_SAVE_SUCCESS:string = 'TOKEN_SAVE_SUCCESS';
  static TOKEN_SAVE_FAILED:string = 'TOKEN_SAVE_FAILED';

  static TOKEN_DELETE:string = 'TOKEN_DELETE';

  static CREATE_USER:string = 'CREATE_USER';
  static CREATE_USER_SUCCESS:string = 'CREATE_USER_SUCCESS';
  static CREATE_USER_FAILED:string = 'CREATE_USER_FAILED';

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

  login(_credentials ): Action {
      return <Action>{
          type: MainActions.LOGIN,
          payload: _credentials.value
      }
  }

  checkAuth():Action{
    return <Action>{
        type: MainActions.CHECK_AUTH,
    }
  }
  checkAuthNoUser():Action{
    return <Action>{
      type: MainActions.CHECK_AUTH_NO_USER,
      payload: null
    }
  }

  logout(){
    return <Action>{
        type: MainActions.LOGOUT,
    }
  }

  create_user(_credentials ): Action {
      return <Action>{
          type: MainActions.CREATE_USER,
          payload: _credentials.value
      }
  }

}
