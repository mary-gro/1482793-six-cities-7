import {user} from './user';
import {ActionType} from '../action';
import {AuthorizationStatus} from '../../const';

const userData = {
  avatarUrl: 'url',
  email: 'mail@mail.ru',
  id: 1,
  isPro: false,
  name: 'noname',
  token: 'token',
};

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
      userData: {},
    };

    expect(user(undefined, {})).toEqual(initialState);
  });

  it('should update authorizationStatus to AUTH', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    };

    const requireAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };
    expect(user(state, requireAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it('should update authorizationStatus to NO_AUTH', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
    };

    const requireAuthorizationAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    };
    expect(user(state, requireAuthorizationAction))
      .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH});
  });

  it('should load user data', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: {},
    };

    const loadUserDataAction = {
      type: ActionType.LOAD_USER_DATA,
      payload: userData,
    };

    expect(user(state, loadUserDataAction)).toEqual({authorizationStatus: AuthorizationStatus.AUTH, userData});
  });

  it('should clear user data after logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      userData,
    };

    const logoutAction = {
      type: ActionType.LOGOUT,
    };

    expect(user(state, logoutAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      });
  });
});
