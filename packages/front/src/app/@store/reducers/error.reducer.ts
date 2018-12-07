
import { ErrorActions, TErrorActions } from '../actions/err.actions';

export interface IErrorState extends Array<any> {}
export const intitialState: IErrorState = [];

/**
 * PATTERN DESIGN:
 * This reducer will check each action type contain word "Error"
 * If finded: update action.type with "ErrorActions.ERROR_SHARED"
 * to meke ErrorEffects working with all features state.
 */
export function reducer (
  state: IErrorState = intitialState,
  action: TErrorActions
): IErrorState {
  // here we update action type to handle ErrorsEffects()
  const originalAction = Object.assign({}, {payload: action.payload, type: action.type});

  action.type = (action.type.includes('Error'))
    ? ErrorActions.ERROR_SHARED
    : action.type;

  // define switch to assign new state
  switch (true) {
    case action.type === ErrorActions.ERROR_SHARED: {
      return [...state, {
        error: action.payload.error,
        message: action.payload.message,
        source: originalAction.type
      }];
    }

    case action.type === ErrorActions.ERROR_DISPLAY_SUCCESS: {
      return [
        ...state.filter(err => err.message !== action.payload.message)
      ];
    }

    default: {
      return <IErrorState>state;
    }
  }

}
