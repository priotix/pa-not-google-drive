import * as types from '../actionTypes/auth';
import { AuthState, AuthActions } from '../types/auth';

const initialState = {
  authData: {},
  isAuthenticated: false,
  loginPending: false,
  logoutPending: false,
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

    case types.USER_LOGOUT:
      return { ...state, logoutPending: true };
    case types.USER_LOGOUT_SUCCESS:
      return { ...state, authData: {}, logoutPending: false, isAuthenticated: false };
    case types.USER_LOGOUT_FAILURE:
      return { ...state, error: action.error, logoutPending: false, isAuthenticated: false };

    case types.USER_REFRESH_TOKEN:
      return { ...state };
    case types.USER_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        authData: { ...state.authData, ...action.payload },
        isAuthenticated: true,
        logoutPending: false,
      };
    case types.USER_REFRESH_TOKEN_FAILURE:
      return { ...state, error: action.error, isAuthenticated: false };
    default:
      return state;
  }
};

export default reducer;
