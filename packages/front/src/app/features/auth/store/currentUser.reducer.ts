import { AuthActions, TAuthActions } from './auth.actions';
import { IUserModel, User } from '@app/shared/models/users/users.model';

// tslint:disable-next-line:no-empty-interface
export interface ICurrentUserState extends IUserModel {}
export const intitialState: ICurrentUserState | null = null;

export function reducer (
  state: ICurrentUserState | null = intitialState,
  action: TAuthActions
): ICurrentUserState | null {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, );
    }
    case AuthActions.CHECK_AUTH_SUCCESS: {
      if (!action.payload.user) {
        return state;
      }
      const user = new User(Object.assign({}, action.payload.user));
      return Object.assign({}, state, user);
    }
    case AuthActions.LOGOUT_SUCCESS: {
      return intitialState;
    }
    case AuthActions.CREATE_SUCCESS: {
      return new User(Object.assign({},  action.payload.user ));
    }
    default: {
      return <ICurrentUserState>state;
    }
  }
}
