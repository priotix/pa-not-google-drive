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
  uploudQueue: [],
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
      return {
        ...state,
        uploudQueue: [...new Map([...state.uploudQueue, ...action.payload].map((item) => [item.name, item])).values()],
      };
    case types.UPLOUD_FILE_SUCCESS:
      return {
        ...state,
        uploudQueue: state.uploudQueue.map((item) => {
          if (item.name === action.payload) {
            return { ...item, status: 'success', name: `${item.name}  ` };
          }
          return { ...item };
        }),
      };
    case types.UPLOUD_FILE_FAILURE:
      return {
        ...state,
        uploudQueue: state.uploudQueue.map((item) => {
          if (item.name === action.payload) {
            return { ...item, status: 'rejected' };
          }
          return { ...item };
        }),
      };

    case types.RESTORE_UPLOUD_QUEUE:
      return { ...state, uploudQueue: [] };

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
