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

export type StorageActions = GetStorageDataPending | GetStorageDataSuccess | GetStorageDataFailure;
