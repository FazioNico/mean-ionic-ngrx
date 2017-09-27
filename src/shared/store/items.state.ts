/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   26-09-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 26-09-2017
*/

export interface ITodo {
  _id: string;
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
  user_id: string;
}
export interface IItemsState extends Array<ITodo>{}
