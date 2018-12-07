import { AuthActions, TAuthActions } from '@app/features/auth/store/auth.actions';

// tslint:disable-next-line:no-empty-interface
export interface IAuthState extends Boolean {}
export const intitialState: IAuthState = false;

export function reducer (
  state: IAuthState = intitialState,
  action: TAuthActions
): IAuthState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      return true;
    }

    case AuthActions.CHECK_AUTH_SUCCESS: {
      return true;
    }
    case AuthActions.ERROR: {
      return false;
    }

    case AuthActions.TOKEN_DELETE: {
      return Object.assign(intitialState);
    }

    case AuthActions.LOGOUT_SUCCESS: {
      return intitialState;
    }

    default: {
      return <IAuthState>state;
    }
  }
}
