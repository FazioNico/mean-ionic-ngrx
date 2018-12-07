import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Action, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: Store<any>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean>  {
    // Manage redirect link:
    // find existing returnUrl data || routerState.url to create `returnUrl`
    const { returnUrl = routerState.url } = route.queryParams;
    // Dispatch check auth action
    this.store.dispatch({type: '[Auth] Check Auth Requested'});
    // Check Auth on store select
    return this.store
      .pipe(
        select(state => state),
        filter((state) => state.loading === false),
        map((state) => {
          if (!state.auth) {
            // console.warn('[NoGuard] user not auth');
            return true;
          }
          // console.warn('[NoGuard] user is auth');
          (returnUrl)
            ? this.router.navigate([returnUrl])
            : this.router.navigate(['index']);
          return false;
        }),
        take(1)
      );

  }
}
