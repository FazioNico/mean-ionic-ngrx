import { Action } from '@ngrx/store';
import { IErrorState } from '@app/@store/reducers/error.reducer';
// import { Params, RouterStateSnapshot } from '@angular/router';
// import { StoreRouterConnectingModule, routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

export interface AppState {
    loading: any; // ILoadingState
    // loaded: ILoadedState;
    error: IErrorState | null;
}
export interface RecucerStateI {
    loading: (state: any, action: Action) => any;
    // loaded: (state: ILoadedState, action: Action) => ILoadedState;
    error: (state: IErrorState, action: Action) => IErrorState|null;
}


// export interface RouterStateUrl {
//     url: string;
//     params: Params;
//     queryParams: Params;
//   }

//   // storeFreeze cause error with ngrx4. Nee to create our own RouterStateCustomSerializer
//   // see: https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#custom-router-state-serializer
//   export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
//     serialize(routerState: RouterStateSnapshot): RouterStateUrl {
//       let route = routerState.root;
//       while (route.firstChild) {
//         route = route.firstChild;
//       }
//       const { url, root: { queryParams } } = routerState;
//       const { params } = route;
//       // Only return an object including the URL, params and query params
//       // instead of the entire snapshot
//       return { url, params, queryParams };
//     }
//   }

