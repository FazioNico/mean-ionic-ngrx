/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-10-2017
*/

import { Action } from "@ngrx/store";

import { IqueryParamsState } from '../store/reducers/queryParamsReducer';
import { ILoadingState } from '../store/reducers/loadingReducer';
import { ILoadedState } from '../store/reducers/loadedReducer';
import { IErrorState } from '../store/reducers/errorReducer';

// TODO use & add selectors
// see => https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
export interface AppStateI {
  loading: ILoadingState,
  loaded: ILoadedState,
  //authCheck: IAuthCheckedState, // added with lazy loading
  queryParams: IqueryParamsState,
  //currentUser?: ICurrentUserState, // added with lazy loading
  error?: IErrorState
  //dataArray?:IDatasState // added with lazy loading
};


export interface RecucerStateI {
  loading: (state: ILoadingState, action: Action) => ILoadingState,
  loaded: (state: ILoadedState, action: Action) => ILoadedState,
  //authCheck: (state: IAuthCheckedState, action: Action) => IAuthCheckedState,
  queryParams: (state: IqueryParamsState, action: Action) => IqueryParamsState,
  //currentUser?: (state: ICurrentUserState, action: Action) => ICurrentUserState,
  error?: (state: IErrorState, action: Action) => IErrorState,
  // dataArray?: (state: IDatasState, action: Action) => IDatasState, // added with lazy loading
};
