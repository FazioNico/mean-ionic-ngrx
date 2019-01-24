import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '@env/environment';
import { AppState } from '../app.state';
import * as fromLoading from './loading.reducer';
import * as fromError from './error.reducer';


export const reducers: ActionReducerMap<AppState> = {
  loading: fromLoading.reducer,
  // loaded: fromLoaded.reducer,
  error: fromError.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
export const AppReducers: ActionReducerMap<AppState> = reducers;
