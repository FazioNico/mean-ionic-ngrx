/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   14-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
*/

import { Action } from "@ngrx/store";

import { ILoadingState } from '../store/reducers/loadingReducer';
import { ILoadedState } from '../store/reducers/loadedReducer';
import { IErrorState } from '../store/reducers/errorReducer';

// TODO use & add selectors
// see => https://github.com/ngrx/platform/blob/master/docs/store/selectors.md
export interface AppStateI {
  loading: ILoadingState,
  loaded: ILoadedState,
  error: IErrorState | null
};

export interface RecucerStateI {
  loading: (state: ILoadingState, action: Action) => ILoadingState,
  loaded: (state: ILoadedState, action: Action) => ILoadedState,
  error: (state: IErrorState, action: Action) => IErrorState|null,
};
