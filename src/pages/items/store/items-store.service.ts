/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 13-11-2017
*/

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { StoreService } from '../../../store/store.service';
import { AppStateI } from '../../../store/app-stats';
import * as items from './items.actions';
import { IItemsState, ITodo } from './items.state';

@Injectable()
export class ItemsStoreService extends StoreService {

  protected readonly STATE = 'datasArray';

  constructor(
    protected store: Store<AppStateI>
  ) { super(); }

  dispatchLoadAction(params:any) {
    this.dispatchAction(new items.LoadAction(params));
  }

  dispatchCreateAction(record: any) {
    this.dispatchAction(new items.CreateAction(record));
  }

  dispatchUpdateAction(record: any)  {
    this.dispatchAction(new items.UpdateAction(record));
  }

  dispatchRemoveAction(id:string) {
    this.dispatchAction(new items.RemoveAction(id));
  }

  // Accessor sample of how to select piece of the state
  getTodos():Observable<ITodo[]> {
    return this.storeSelectFeatureState()
    .map((state: IItemsState) => state);
  }

  findById(record: {_id:string}):Observable<ITodo|any> {
    return this.getTodos()
    .map((state:IItemsState)=> state.find((item:ITodo) => item._id === record._id))
  }

}
