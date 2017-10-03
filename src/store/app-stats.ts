/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-10-2017
*/

import { Action } from "@ngrx/store";

// import { IDatasState } from '../store/reducers/datasReducer'; // added with lazy loading
import { IqueryParamsState } from '../store/reducers/queryParamsReducer';
import { ILoadingState } from '../store/reducers/loadingReducer';
import { ILoadedState } from '../store/reducers/loadedReducer';
import { IAuthCheckedState } from '../store/reducers/authCheckedReducer';
import { IErrorState } from '../store/reducers/errorReducer';
import { ICurrentUserState } from '../store/reducers/currentUserReducer';

// TODO use & add selectors
// see => https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
export interface AppStateI {
  loading: ILoadingState,
  loaded: ILoadedState,
  //authCheck: IAuthCheckedState,
  queryParams: IqueryParamsState,
  //currentUser?: ICurrentUserState,
  error?: IErrorState
  //dataArray?:IDatasState // added with lazy loading
  dataObject?: Object
};


export interface RecucerStateI {
  loading: (state: ILoadingState, action: Action) => ILoadingState,
  loaded: (state: ILoadedState, action: Action) => ILoadedState,
  //authCheck: (state: IAuthCheckedState, action: Action) => IAuthCheckedState,
  queryParams: (state: IqueryParamsState, action: Action) => IqueryParamsState,
  //currentUser?: (state: ICurrentUserState, action: Action) => ICurrentUserState,
  error?: (state: IErrorState, action: Action) => IErrorState,
  // dataArray?: (state: IDatasState, action: Action) => IDatasState, // added with lazy loading
  dataObject?: (state: Object, action: Action) => Object
};
