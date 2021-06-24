import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import config from '../../config/default.json';
import * as types from '../actionTypes/auth';
import { AuthActions, LoginDataInterface, CreateUserDataInterface } from '../types/auth';
import { RootState } from '../reducers/index';

const configUrl = config.globals.urlAdminsHost;

export const userLogin = (loginData: LoginDataInterface): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    dispatch({ type: types.USER_LOGIN });
    try {
      const url = `${configUrl}/auth/login`;
      const data = await axios.post(url, loginData);

      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.USER_LOGIN_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const createUserData = (data: CreateUserDataInterface): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    try {
      const url = `${configUrl}/users/create`;
      dispatch({ type: types.CREATE_USER_PENDING });
      const response = await axios.post(url, data);

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

export const userLogout = (): ThunkAction<void, RootState, null, AuthActions> => {
  return async (dispatch) => {
    dispatch({ type: types.USER_LOGOUT });
    try {
      await axios.post(`${configUrl}/auth/logout`);

      dispatch({ type: types.USER_LOGOUT_SUCCESS, payload: {} });
      return false;
    } catch (err) {
      dispatch({ type: types.USER_LOGOUT_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};
