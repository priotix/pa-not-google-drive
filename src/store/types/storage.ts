import * as types from '../actionTypes/storage';

export interface StorageDataItem {
  id: string;
  name: string;
  type: string;
}

export interface StorageState {
  storageData: {
    documents: StorageDataItem[];
  };
  getDataPending: boolean;
  error: string;
  parentId: null | string;
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

interface UploudFile {
  type: typeof types.UPLOUD_FILE;
}

interface UploudFileSuccess {
  type: typeof types.UPLOUD_FILE_SUCCESS;
  payload: any;
}

interface UploudFileFailure {
  type: typeof types.UPLOUD_FILE_FAILURE;
  error: any;
}

interface SetParentId {
  type: typeof types.SET_PARENTID;
  id: string | null;
}

export type StorageActions =
  | GetStorageDataPending
  | GetStorageDataSuccess
  | GetStorageDataFailure
  | CreateFolder
  | CreateFolderSuccess
  | CreateFolderFailure
  | UploudFile
  | UploudFileSuccess
  | UploudFileFailure
  | SetParentId;
