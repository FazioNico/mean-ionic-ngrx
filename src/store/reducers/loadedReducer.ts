/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
*/

import { Action } from "@ngrx/store";
import { MainActions } from '../actions/mainActions';

export interface ILoadedState  {
  loaded: boolean;
};

export const intitialState:ILoadedState = {
  loaded: false
}

export function reducer (state:ILoadedState = intitialState, action:Action):ILoadedState {
  //console.log('LOADED REDUCER-> ', action);
  switch (action.type) {
    case MainActions.GET_DATAS_ARRAY: {
      return Object.assign({}, state, { loaded: false})
    }
    case MainActions.GET_DATAS_ARRAY_SUCCESS: {
      return Object.assign({}, state, { loaded: true})
    }
    case MainActions.GET_DATAS_ARRAY_FAILED: {
      return Object.assign({}, state, { loaded: false})
    }

    case MainActions.UPDATE_DATA: {
      return Object.assign({}, state, { loaded: false})
    }
    case MainActions.UPDATE_DATA_SUCCESS: {
      return Object.assign({}, state, { loaded: true})
    }
    case MainActions.UPDATE_DATA_FAILED: {
      return Object.assign({}, state, { loaded: false})
    }

    case MainActions.DELETE_DATA: {
      return Object.assign({}, state, { loaded: false})
    }
    case MainActions.DELETE_DATA_SUCCESS: {
      return Object.assign({}, state, { loaded: true})
    }
    case MainActions.DELETE_DATA_FAILED: {
      return Object.assign({}, state, { loaded: false})
    }

    case MainActions.CREATE_DATA: {
      return Object.assign({}, state, { loaded: false})
    }
    case MainActions.CREATE_DATA_SUCCESS: {
      return Object.assign({}, state, { loaded: true})
    }
    case MainActions.CREATE_DATA_FAILED: {
      return Object.assign({}, state, { loaded: false})
    }

    case MainActions.CHECK_AUTH_SUCCESS: {
      return Object.assign({}, state, { loaded: true })
    }
    case MainActions.CHECK_AUTH_FAILED: {
      return Object.assign({}, state, { loaded: false })
    }
    case MainActions.CHECK_AUTH_NO_USER: {
      return Object.assign({}, state, { loaded: false })
    }
    default: {
      return <ILoadedState>state;
    }
  }
};
