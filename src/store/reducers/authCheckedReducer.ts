/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-04-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 15-04-2017
 */

 import { Action } from "@ngrx/store";

 export interface IAuthCheckedState {
   authChecked: boolean;
   currentCreds?: any
 };

 export const intitialState:IAuthCheckedState = {
   authChecked: false,
 }

 export function reducer (state:IAuthCheckedState = intitialState, action:Action):IAuthCheckedState {
     //console.log('CURRENT USER REDUCER-> ', action);
     switch (action.type) {
       default: {
         return <IAuthCheckedState>state;
       }
     }
 };
