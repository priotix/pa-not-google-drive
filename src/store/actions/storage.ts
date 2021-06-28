import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import config from '../../config/default.json';
import * as types from '../actionTypes/storage';
import { StorageActions } from '../types/storage';
import { RootState } from '../reducers/index';
import { loadState } from '../../libs/localStorage';

const configUrl = config.globals.urlStorageHost;
const { accessToken } = loadState().auth.authData;

export const getStorageData = (): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_STORAGE_DATA });
    try {
      const url = `${configUrl}/items`;
      const data = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch({ type: types.GET_STORAGE_DATA_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.GET_STORAGE_DATA_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const createFolder = (name: string, parentId?: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_FOLDER });
    try {
      const url = `${configUrl}/items`;
      const data = await axios.post(
        url,
        { name, parentId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch({ type: types.CREATE_FOLDER_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.CREATE_FOLDER_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};
