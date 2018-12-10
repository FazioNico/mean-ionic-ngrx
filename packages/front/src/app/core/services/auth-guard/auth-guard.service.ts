import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Action, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: Store<any>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean>  {
    // Manage redirect link:
    // find existing returnUrl data || routerState.url to create `returnUrl`
    const { returnUrl = routerState.url}  = route.queryParams ;
    // Dispatch check auth action
    this.store.dispatch({type: '[Auth] Check Auth Requested'});

    // Check Auth on store select
    return this.store
      .pipe(
        select(state => state),
        map((state) =>
          (state.currentUser)
            ? state
            : Object.assign({}, state, {loading: false})
        ),
        filter((state) => state.loading === false ),
        map((state) => {
          if (state.authCheck) {
            // console.warn('[AuthGuard] user auth');
            return true;
          }
          // console.warn('[AuthGuard] user is not auth', state);
          this.router.navigate(['/auth'], {queryParams: {returnUrl}});
          return false;
        }),
        take(1)
      );

  }
}
