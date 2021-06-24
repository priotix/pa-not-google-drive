import * as types from '../actionTypes/auth';

export interface AuthState {
  authData: any;
  isAuthenticated: boolean;
  loginPending: boolean;
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
  | CreateUserPending
  | CreateUserSuccess
  | CreateUserFailure;
