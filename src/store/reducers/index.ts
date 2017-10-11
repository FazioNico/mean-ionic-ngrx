/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 11-10-2017
 */

 import { MetaReducer, ActionReducerMap, Action } from '@ngrx/store';
 import { storeFreeze } from 'ngrx-store-freeze';

 import * as fromLoading from './loadingReducer';
 import * as fromLoaded from './loadedReducer';
 import * as fromQueryParams from './queryParamsReducer';
 import * as fromError from './errorReducer';

 import { AppStateI, RecucerStateI } from '../app-stats';

 // Only root reducer state without lazy module state.
 const reducers:RecucerStateI = {
   loading: fromLoading.reducer,
   loaded: fromLoaded.reducer,
   queryParams: fromQueryParams.reducer,
   error: fromError.reducer
 };

 export const reducer:ActionReducerMap<AppStateI> = reducers;
 export const metaReducers: MetaReducer<AppStateI>[] = (__DEV__) ? [storeFreeze]: [];
