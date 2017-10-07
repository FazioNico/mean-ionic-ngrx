/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 07-10-2017
 */

 import { MetaReducer, ActionReducerMap, Action } from '@ngrx/store';
 import { storeFreeze } from 'ngrx-store-freeze';

 import * as fromLoading from './loadingReducer';
 import * as fromLoaded from './loadedReducer';
 import * as fromQueryParams from './queryParamsReducer';
 import * as fromError from './errorReducer';

 import { AppStateI, RecucerStateI } from '../app-stats';

 // Do not re-declare process: it's already declare in EnvironmentModule
 // export declare const process: any; // Typescript compiler will complain without this

 const reducers:RecucerStateI = {
   loading: fromLoading.reducer,
   loaded: fromLoaded.reducer,
   queryParams: fromQueryParams.reducer,
   error: fromError.reducer
 };

 export const reducer:ActionReducerMap<AppStateI> = reducers;
 export const metaReducers: MetaReducer<AppStateI>[] = (process.env.IONIC_ENV !== 'prod' || process.env.NODE_ENV !== 'prod' ) ? [storeFreeze]: [];
