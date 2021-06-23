import * as types from '../actionTypes/auth';

export interface AuthState {
  authData: any;
  isAuthenticated: boolean;
  loginPending: boolean;
  logoutPending: boolean;
  error: string;
}

export interface LoginDataInterface {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CreateUserDataInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  timeZone: string;
}

// Actions
interface UserLoginPending {
  type: typeof types.USER_LOGIN;
}

interface UserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: any;
}
interface UserLoginFailure {
  type: typeof types.USER_LOGIN_FAILURE;
  error: any;
}

interface UserLogOutPending {
  type: typeof types.USER_LOGOUT;
}

interface UserLogOutSuccess {
  type: typeof types.USER_LOGOUT_SUCCESS;
  payload: any;
}
interface UserLogOutFailure {
  type: typeof types.USER_LOGOUT_FAILURE;
  error: any;
}

interface UserRefreshTokenPending {
  type: typeof types.USER_REFRESH_TOKEN;
}

interface UserRefreshTokenSuccess {
  type: typeof types.USER_REFRESH_TOKEN_SUCCESS;
  payload: any;
}
interface UserRefreshTokenFailure {
  type: typeof types.USER_REFRESH_TOKEN_FAILURE;
  error: any;
}

interface CreateUserPending {
  type: typeof types.CREATE_USER_PENDING;
}

interface CreateUserSuccess {
  type: typeof types.CREATE_USER_SUCCESS;
  payload: any;
}
interface CreateUserFailure {
  type: typeof types.CREATE_USER_FAILURE;
  error: any;
}

export type AuthActions =
  | UserLoginPending
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogOutPending
  | UserLogOutSuccess
  | UserLogOutFailure
  | UserRefreshTokenPending
  | UserRefreshTokenSuccess
  | UserRefreshTokenFailure
  | CreateUserPending
  | CreateUserSuccess
  | CreateUserFailure;
