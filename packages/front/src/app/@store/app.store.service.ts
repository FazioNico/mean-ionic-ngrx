import { Action, Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { Observable } from 'rxjs';
/**
* Define an abstract class to be used by each module with store
* This can make more easeling provide generic methode to all child service.
*/
export abstract class AppStoreService {
  // do not forguet to init STATE proprety in each child module
  // to select the right feature store state.
  protected readonly STATE: any;
  protected store: Store<AppState>;

  protected storeSelectFeatureState(): Observable<any> {
    return this.store.pipe(select(this.STATE));
  }

  protected dispatchAction(action: Action): void {
    this.store.dispatch(action);
  }

  /* in case you need to handle CRUD actions in all services
  these methods will need to be implemented by feature service */
  abstract dispatchLoadAction(options: any): void;
  abstract dispatchCreateAction(options: any): void;
  abstract dispatchUpdateAction(options: any): void;
  abstract dispatchRemoveAction(options: any): void;
}
