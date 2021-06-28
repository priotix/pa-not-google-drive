import * as types from '../actionTypes/storage';

export interface StorageState {
  storageData: any;
  getDataPending: boolean;
  error: string;
}

interface GetStorageDataPending {
  type: typeof types.GET_STORAGE_DATA;
}

interface GetStorageDataSuccess {
  type: typeof types.GET_STORAGE_DATA_SUCCESS;
  payload: any;
}

interface GetStorageDataFailure {
  type: typeof types.GET_STORAGE_DATA_FAILURE;
  error: any;
}

interface CreateFolder {
  type: typeof types.CREATE_FOLDER;
}

interface CreateFolderSuccess {
  type: typeof types.CREATE_FOLDER_SUCCESS;
  payload: any;
}

interface CreateFolderFailure {
  type: typeof types.CREATE_FOLDER_FAILURE;
  error: any;
}

export type StorageActions =
  | GetStorageDataPending
  | GetStorageDataSuccess
  | GetStorageDataFailure
  | CreateFolder
  | CreateFolderSuccess
  | CreateFolderFailure;
