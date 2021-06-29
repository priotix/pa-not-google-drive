import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import config from '../../config/default.json';
import * as types from '../actionTypes/storage';
import { StorageActions } from '../types/storage';
import { RootState } from '../reducers/index';
import request from '../../services/authenticatedRequest';

const configUrl = config.globals.urlStorageHost;

export const getUserInfo = (): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_USER_INFO_PENDING });
    try {
      const url = `${configUrl}/users/info`;
      const data = await request.get(url);

      dispatch({ type: types.GET_USER_INFO_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.GET_USER_INFO_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const getStorageData = (parentId?: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_STORAGE_DATA });
    try {
      const url = `${configUrl}/items`;
      const data = await request.get(url, { params: { parent: parentId } });

      dispatch({ type: types.GET_STORAGE_DATA_SUCCESS, payload: data.data });
      dispatch(getUserInfo());
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.GET_STORAGE_DATA_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const createFolder = (requestData): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.CREATE_FOLDER });
    try {
      const url = `${configUrl}/items`;
      const data = await request.post(url, requestData);

      dispatch({ type: types.CREATE_FOLDER_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.CREATE_FOLDER_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const uploadFile = (
  name: string,
  size: string,
  file: any,
  parentId?: string
): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.UPLOUD_FILE });
    try {
      const parent = parentId ? `&parent=${parentId}` : '';
      const url = `${configUrl}/items/upload?name=${name}&size=${size}${parent}`;
      const body = new FormData();
      body.append('file', file);
      const data = await request.post(url, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch({ type: types.UPLOUD_FILE_SUCCESS, payload: data.data });
      toast.success('File uploaded successfully.');
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.UPLOUD_FILE_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const deleteFile = (id: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.DELETE_FILE });
    try {
      const url = `${configUrl}/items/${id}`;
      const data = await request.delete(url);

      dispatch({ type: types.DELETE_FILE_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.DELETE_FILE_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const renameFile = (id: string, name: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.RENAME_FILE });
    try {
      const url = `${configUrl}/items/${id}`;
      const data = await request.put(url, { name });

      dispatch({ type: types.RENAME_FILE_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.RENAME_FILE_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const searchFiles = (query: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.SEARCH_FILES });
    try {
      const url = `${configUrl}/items/search`;
      const data = await request.get(url, { params: { query: query || undefined } });

      dispatch({ type: types.SEARCH_FILES_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.toString());
      dispatch({ type: types.SEARCH_FILES_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};
