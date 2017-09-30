/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   27-09-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 29-09-2017
 */

 import 'rxjs/add/operator/filter';

 import { Injectable } from '@angular/core';
 import { Store } from '@ngrx/store';

 import { StoreService } from '../../../store/store.service';
 import { AppStateI } from '../../../store/app-stats';
 import * as items from './items.actions';
 import { IItemsState } from './items.state';

 @Injectable()
 export class ItemsStoreService extends StoreService {

   protected readonly STATE = 'datasArray';

   constructor(
     protected store: Store<AppStateI>
   ) { super(); }

   dispatchLoadAction(params) {
     this.dispatchAction(new items.LoadAction(params));
   }

   dispatchCreateAction(record: any) {
     this.dispatchAction(new items.CreateAction(record));
   }

   dispatchUpdateAction(record: any)  {
     this.dispatchAction(new items.UpdateAction(record));
   }

   dispatchRemoveAction(id) {
     this.dispatchAction(new items.RemoveAction(id));
   }

   // Accessor sample of how to select piece of the state
   getTodos() {
     return this.storeSelectFeatureState()
       .map((state: IItemsState) => state);
   }

  //  getError() {
  //    return this.storeSelectFeatureState()
  //      .map((state: IItemsState) => state.error);
  //  }
   //
  //  findById(record: {id}) {
  //    return this.getTasks()
  //      .filter(item => item['id'] === record['id']);
  //  }
 }
