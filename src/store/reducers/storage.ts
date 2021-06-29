import * as types from '../actionTypes/storage';
import { StorageState, StorageActions } from '../types/storage';

const initialState = {
  storageData: {
    documents: [],
  },
  getDataPending: false,
  error: null,
  parentId: null,
  free: null,
  total: null,
  uploudPending: false,
};

export const reducer = (state = initialState, action: StorageActions): StorageState => {
  switch (action.type) {
    case types.GET_STORAGE_DATA:
      return { ...state, getDataPending: true };
    case types.GET_STORAGE_DATA_SUCCESS:
      return {
        ...state,
        storageData: action.payload,
        getDataPending: false,
      };
    case types.GET_STORAGE_DATA_FAILURE:
      return { ...state, error: action.error, getDataPending: false };

    case types.SEARCH_FILES:
      return { ...state, getDataPending: true };
    case types.SEARCH_FILES_SUCCESS:
      return {
        ...state,
        storageData: action.payload,
        getDataPending: false,
      };
    case types.SEARCH_FILES_FAILURE:
      return { ...state, error: action.error, getDataPending: false };

    case types.SET_PARENTID:
      return { ...state, parentId: action.id };

    case types.UPLOUD_FILE:
      return { ...state, uploudPending: true };
    case types.UPLOUD_FILE_SUCCESS:
      return {
        ...state,
        uploudPending: false,
      };
    case types.UPLOUD_FILE_FAILURE:
      return { ...state, uploudPending: false };

    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        free: action.payload.free / 1048576,
        total: action.payload.total / 1048576,
      };
    default:
      return state;
  }
};

export default reducer;
