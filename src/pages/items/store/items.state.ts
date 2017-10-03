/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   27-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 03-10-2017
*/

// import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface ITodo {
  _id: string;
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
  user_id: string;
}

export class MTodo implements ITodo{
  _id: string;
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
  user_id: string;

  constructor(desc: string) {
    this.description = desc;
    this.isComplete = false;
  }
}

// TODO use Entities
// see => https://github.com/ngrx/platform/tree/master/docs/entity

// export interface IItemsState extends EntityState<MTodo>{}
// export const adapter: EntityAdapter<MTodo> = createEntityAdapter<MTodo>({
//   selectId: (task: ITodo) => task._id,
//   sortComparer: false,
// });
// export const intitialState: IItemsState = adapter.getInitialState([]);

export interface IItemsState extends Array<MTodo>{}
export const intitialState:IItemsState = []
