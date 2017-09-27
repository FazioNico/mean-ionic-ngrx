/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-09-2017
 */

 import { ActionReducerMap, combineReducers, ActionReducer, Action } from '@ngrx/store';
 import { storeFreeze } from 'ngrx-store-freeze';

 import * as fromLoading from './loadingReducer';
 import * as fromLoaded from './loadedReducer';
 import * as fromQueryParams from './queryParamsReducer';
 import * as fromCurrentUser from './currentUserReducer';
 import * as fromAuthCheck from './authCheckedReducer';
 import * as fromError from './errorReducer';

 import { AppStateI, RecucerStateI } from '../app-stats';

 declare const process: any; // Typescript compiler will complain without this

 const reducers:RecucerStateI = {
   loading: fromLoading.reducer,
   loaded: fromLoaded.reducer,
   queryParams: fromQueryParams.reducer,
   authCheck: fromAuthCheck.reducer,
   currentUser: fromCurrentUser.reducer,
   error: fromError.reducer
 };
 const developmentReducer= reducers;
 const productionReducer = reducers; //combineReducers(reducers);


 //export const reducer:ActionReducerMap<State> = process.env.IONIC_ENV === 'prod' ? productionReducer :  developmentReducer;
 export const reducer = process.env.IONIC_ENV === 'prod' ? productionReducer :  developmentReducer;

 // export function reducer(state: any, action: Action):AppStateI {
 //   let combineReducer:AppStateI = process.env.IONIC_ENV === 'prod' ? productionReducer(state, action) : developmentReducer(state, action);
 //   if(process.env.NODE_ENV === 'prod') { combineReducer = productionReducer(state, action) };
 //   return combineReducer
 // }
