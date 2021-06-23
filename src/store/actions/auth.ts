/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import request from '../../services/request';
import config from '../../config/default.json';
import * as types from '../actionTypes/auth';
import { AuthActions, LoginDataInterface, CreateUserDataInterface } from '../types/auth';
import { RootState } from '../reducers/index';

const configUrl = config.globals.urlAdminsHost;

export const userLogin = (loginData: LoginDataInterface): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    dispatch({ type: types.USER_LOGIN });
    try {
      const { rememberMe, ...otherData } = loginData;
      const url = `${configUrl}/auth/login`;
      const { data } = await request('post', url, {
        data: otherData,
        params: { rememberMe: rememberMe || undefined },
        auth: false,
      });

      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.USER_LOGIN_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const userLogout = (hasTokenExpired: boolean): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    dispatch({ type: types.USER_LOGOUT });
    try {
      hasTokenExpired
        ? toast.warn('Logged out because of expired session.')
        : await request('post', `${configUrl}/auth/logout`);

      dispatch({ type: types.USER_LOGOUT_SUCCESS, payload: {} });
      return false;
    } catch (err) {
      dispatch({ type: types.USER_LOGOUT_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const refreshToken = (refreshTokenData: string): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    dispatch({ type: types.USER_REFRESH_TOKEN });
    try {
      const url = `${configUrl}/auth/refresh-token`;
      const response = await request('post', url, { data: { refreshTokenData }, auth: false });
      dispatch({ type: types.USER_REFRESH_TOKEN_SUCCESS, payload: response ? response.data : {} });
      return response ? response.data : {};
    } catch (err) {
      dispatch({ type: types.USER_REFRESH_TOKEN_FAILURE, error: err.response && err.response.data });
      throw err;
    }
  };
};

export const createUserData = (data: CreateUserDataInterface): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    try {
      const url = `${configUrl}/users/create`;
      dispatch({ type: types.CREATE_USER_PENDING });
      const response = await request('post', url, { data });

      toast.success('User created successfully.');
      dispatch({ type: types.CREATE_USER_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      toast.error(error.response && error.response.data.message);
      dispatch({ type: types.CREATE_USER_FAILURE, error: error.response && error.response.data });
      return error.response && error.response.data;
    }
  };
};
