import * as types from '../actionTypes/auth';
import { AuthState, AuthActions } from '../types/auth';

const initialState = {
  authData: {},
  isAuthenticated: false,
  loginPending: false,
  error: null,
};

export const reducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case types.USER_LOGIN:
      return { ...state, loginPending: true };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        authData: { ...state.authData, ...action.payload },
        isAuthenticated: true,
        loginPending: false,
      };
    case types.USER_LOGIN_FAILURE:
      return { ...state, error: action.error, isAuthenticated: false, loginPending: false };
    default:
      return state;
  }
};

export default reducer;
