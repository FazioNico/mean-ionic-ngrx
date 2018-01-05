/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   17-04-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 05-01-2018
*/
import { Action } from '@ngrx/store';

export interface ILoadedState extends Boolean {};
export const intitialState:ILoadedState = false;

/**
 * PATTERN DESIGN:
 * This reducer will check each action definition to find 3 type of action.
 *  - "Requested": will find if action contain "Requested" word.
 *  - "Success": will find if action contain "Success" word.
 *  - "Error": will find if action === "Error"
 */
export function reducer (
  state:ILoadedState = intitialState,
  action:Action
):ILoadedState {

  switch (true) {

    case action.type.includes('Requested'): {
      return false
    }

    case action.type.includes('Success'): {
      return true
    }

    case action.type.includes('Error'): {
      return false
    }

    default: {
      return <ILoadedState>state;
    }
  }
};
