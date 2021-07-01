import FileSaver from 'file-saver';
import { toast } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import config from '../../config/default.json';
import * as types from '../actionTypes/storage';
import { StorageActions } from '../types/storage';
import { RootState } from '../reducers/index';
import request from '../../services/authenticatedRequest';
import fileReader from '../../libs/fileReader';

const configUrl = config.globals.urlStorageHost;

const errorMessages = {
  'item-data-is-invalid': 'File already exists.',
  'item-parent-not-found': 'Folder does not exist.',
  'item-not-found': 'File does not exist.',
  'item-parent-is-invalid': 'Wrong parentId.',
};

const handleErrMessages = (err) => {
  if (err.data && err.data.errors && err.data.errors[0].slug) {
    return errorMessages[err.data.errors[0].slug] || 'Something went wrong';
  }
  return 'Something went wrong';
};

export const getUserInfo = (): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_USER_INFO_PENDING });
    try {
      const url = `${configUrl}/users/info`;
      const data = await request.get(url);

      dispatch({ type: types.GET_USER_INFO_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
      dispatch({ type: types.GET_USER_INFO_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const getStorageData = ({
  parentId,
  searchQuery,
  skip,
  limit,
}: {
  parentId?: string;
  searchQuery?: string;
  skip?: number;
  limit?: number;
}): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_STORAGE_DATA });
    try {
      const url = `${configUrl}/items`;
      const data = await request.get(url, {
        params: { parent: parentId, skip, limit, sort: '-updatedAt', query: searchQuery || undefined },
      });

      dispatch({ type: types.GET_STORAGE_DATA_SUCCESS, payload: data.data });
      dispatch(getUserInfo());
      return data;
    } catch (err) {
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
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
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
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
    dispatch({ type: types.UPLOUD_FILE, payload: [{ name, size, status: 'pending' }] });
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
      dispatch({ type: types.UPLOUD_FILE_SUCCESS, payload: data.data.name });
      toast.success('File uploaded successfully.');
      return data;
    } catch (err) {
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
      dispatch({ type: types.UPLOUD_FILE_FAILURE, payload: name });
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
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
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
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
      dispatch({ type: types.RENAME_FILE_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const getItemInfo = (id: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.GET_ITEM_INFO });
    try {
      let data;
      if (!id) {
        data = { data: { path: '/storage' } };
      } else {
        const url = `${configUrl}/items/${id}/info`;
        data = await request.get(url);
      }

      dispatch({ type: types.GET_ITEM_INFO_SUCCESS, payload: data.data });
      return data;
    } catch (err) {
      toast.error(err.response ? handleErrMessages(err.response) : 'Something went wrong');
      dispatch({ type: types.GET_ITEM_INFO_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};

export const setQueryParams = (skip: number, limit: number): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.SET_QUERY_PARAMS, payload: { skip, limit } });
  };
};

export const downloadFile = (id: string): ThunkAction<void, RootState, null, StorageActions> => {
  return async (dispatch) => {
    dispatch({ type: types.DOWNLOAD_FILE });

    try {
      const url = `${configUrl}/items/${id}`;
      const { data: fileInfo } = await request.get(`${url}/info`);
      const { data } = await request.get(url, { responseType: 'blob' });

      await FileSaver.saveAs(data, fileInfo.name);

      dispatch({
        type: types.DOWNLOAD_FILE_SUCCESS,
      });
    } catch (err) {
      if (err.response) {
        try {
          const { data } = err.response;
          const file = await fileReader(data);
          const { message } = JSON.parse(file as string);
          toast.error(message);
        } catch (readError) {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Something went wrong');
      }

      dispatch({ type: types.DOWNLOAD_FILE_FAILURE, error: err.response && err.response.data });
      return err.response && err.response.data;
    }
  };
};
