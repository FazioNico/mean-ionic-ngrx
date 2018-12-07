import { ErrorActions, ErrorAction } from '../actions/err.actions';

// tslint:disable-next-line:no-empty-interface
export interface ILoadingState extends Boolean {}

export const intitialState: ILoadingState = false;

/**
 * PATTERN DESIGN:
 * This reducer will check each action definition to find 3 type of action.
 *  - "Requested": will find if action contain "Requested" word and OPEN application loader (modal spinner)
 *  - "Success": will find if action contain "Success" word and CLOSE application loader (modal spinner)
 *  - "ErrorActions.ERROR_DISPLAY": will find if action === "ErrorActions.ERROR_DISPLAY" and CLOSE  application loader (modal spinner)
 */
export function reducer (
  state: ILoadingState = intitialState,
  action: ErrorAction
): ILoadingState {
  switch (true) {

    case action.type.includes('Requested'): {
      return true;
    }

    case action.type.includes('Success'): {
      return false;
    }

    case action.type === ErrorActions.ERROR_DISPLAY: {
      return false;
    }

    default: {
      return <ILoadingState>state;
    }
  }
}
