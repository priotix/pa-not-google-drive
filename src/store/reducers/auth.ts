import * as types from '../actionTypes/auth';
import { AuthState, AuthActions } from '../types/auth';

const initialState = {
  authData: {},
  isAuthenticated: false,
  loginPending: false,
  error: null,
  logoutPending: false,
  userCreated: false,
};

export const reducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case types.USER_LOGIN:
      return { ...state, loginPending: true, error: null };
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
    case types.CREATE_USER_SUCCESS:
      return { ...state, userCreated: true };
    case types.USER_LOGOUT_SUCCESS:
      return { ...state, authData: {}, logoutPending: false, isAuthenticated: false };
    case types.USER_LOGOUT_FAILURE:
      return { ...state, error: action.error, logoutPending: false, isAuthenticated: false };
    default:
      return state;
  }
};

export default reducer;
