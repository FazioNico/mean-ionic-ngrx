/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-10-2017
 */

 import { Action, Store } from '@ngrx/store';

 import { AppStateI } from './app-stats';

 export abstract class StoreService {
   protected readonly STATE;
   protected store: Store<AppStateI>;

   protected storeSelectFeatureState():Store<any> {
     return this.store.select(this.STATE);
   }

   protected dispatchAction(action:Action):void {
     this.store.dispatch(action);
   }

   /* in case you need to handle CRUD actions in all services
   these methods will need to be implemented by feature service */
   abstract dispatchLoadAction(params:{path:string});
   abstract dispatchCreateAction(record:any);
   abstract dispatchUpdateAction(record:any);
   abstract dispatchRemoveAction(id:string|number);
 }
