/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */
 import { combineReducers, ActionReducer } from '@ngrx/store';
 import { compose } from '@ngrx/core/compose';
 import { storeFreeze } from 'ngrx-store-freeze';

 import * as fromDatas from './datasReducer';
 import * as fromLoading from './loadingReducer';
 import * as fromLoaded from './loadedReducer';
 import * as fromQueryParams from './queryParamsReducer';
 import * as fromCurrentUser from './currentUserReducer';
 import * as fromAuthCheck from './authCheckedReducer';
 import * as fromError from './errorReducer';

 import { AppStateI, RecucerStateI } from '../app-stats';

 const environment = {
   name: 'dev'
 };
 const reducers:RecucerStateI = {
   dataArray: fromDatas.reducer,
   loading: fromLoading.reducer,
   loaded: fromLoaded.reducer,
   queryParams: fromQueryParams.reducer,
   authCheck: fromAuthCheck.reducer,
   currentUser: fromCurrentUser.reducer,
   error: fromError.reducer
 };
 const developmentReducer:ActionReducer<AppStateI> = compose(storeFreeze, combineReducers)(reducers);
 const productionReducer: ActionReducer<AppStateI> = combineReducers(reducers);

 export function reducer(state: any, action: any):AppStateI {
   if (environment.name === 'prod') {
     return productionReducer(state, action);
   } else {
     return developmentReducer(state, action);
   }
 }
