import * as types from '../actionTypes/storage';

export interface StorageDataItem {
  id: string;
  name: string;
  type: string;
  parentIds: string[];
  updatedAt: string;
  size: number;
}

export interface StorageState {
  storageData: {
    documents: StorageDataItem[];
    total: number;
  };
  getDataPending: boolean;
  error: string;
  parentId: null | string;
  free: number;
  total: number;
  queryParams: {
    skip: number;
    limit: number;
  };
  uploudQueue: {
    name: string;
    size: string;
    status: string;
  }[];
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

interface UploadFile {
  type: typeof types.UPLOUD_FILE;
  payload: {
    name: string;
    size: string;
    status: string;
  }[];
}

interface UploadFileSuccess {
  type: typeof types.UPLOUD_FILE_SUCCESS;
  payload: string;
}

interface UploadFileFailure {
  type: typeof types.UPLOUD_FILE_FAILURE;
  payload: string;
}

interface RestoreUploudQueue {
  type: typeof types.RESTORE_UPLOUD_QUEUE;
  id: string | null;
}

interface RestoreStorageData {
  type: typeof types.RESTORE_STORAGE_DATA;
}

interface SetParentId {
  type: typeof types.SET_PARENTID;
  id: string | null;
}

interface SetQueryParams {
  type: typeof types.SET_QUERY_PARAMS;
  payload: {
    skip: number;
    limit: number;
  };
}

interface DeleteFile {
  type: typeof types.DELETE_FILE;
}

interface DeleteFileSuccess {
  type: typeof types.DELETE_FILE_SUCCESS;
  payload: any;
}

interface DeleteFileFailure {
  type: typeof types.DELETE_FILE_FAILURE;
  error: any;
}

interface RenameFile {
  type: typeof types.RENAME_FILE;
}

interface RenameFileSuccess {
  type: typeof types.RENAME_FILE_SUCCESS;
  payload: any;
}

interface RenameFileFailure {
  type: typeof types.RENAME_FILE_FAILURE;
  error: any;
}

interface SearchFilesPending {
  type: typeof types.SEARCH_FILES;
}

interface SearchFilesSuccess {
  type: typeof types.SEARCH_FILES_SUCCESS;
  payload: any;
}

interface SearchFilesFailure {
  type: typeof types.SEARCH_FILES_FAILURE;
  error: any;
}

interface GetUserInfoPending {
  type: typeof types.GET_USER_INFO_PENDING;
}

interface GetUserInfoSuccess {
  type: typeof types.GET_USER_INFO_SUCCESS;
  payload: any;
}
interface GetUserInfoFailure {
  type: typeof types.GET_USER_INFO_FAILURE;
  error: any;
}

export type StorageActions =
  | GetStorageDataPending
  | GetStorageDataSuccess
  | GetStorageDataFailure
  | CreateFolder
  | CreateFolderSuccess
  | CreateFolderFailure
  | UploadFile
  | UploadFileSuccess
  | UploadFileFailure
  | SetParentId
  | DeleteFile
  | DeleteFileSuccess
  | DeleteFileFailure
  | RenameFile
  | RenameFileSuccess
  | RenameFileFailure
  | SearchFilesPending
  | SearchFilesSuccess
  | SearchFilesFailure
  | GetUserInfoPending
  | GetUserInfoSuccess
  | GetUserInfoFailure
  | RestoreUploudQueue
  | SetQueryParams
  | RestoreStorageData;
