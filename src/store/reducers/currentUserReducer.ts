/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface ICurrentUserState {
   currentUser?: any;
 };

 export const intitialState:ICurrentUserState = {}

 export function reducer (state:ICurrentUserState = intitialState, action:Action):ICurrentUserState {
     //console.log('CURRENT USER REDUCER-> ', action);
     switch (action.type) {
       default: {
         return <ICurrentUserState>state;
       }
     }
 };
