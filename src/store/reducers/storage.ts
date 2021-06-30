import * as types from '../actionTypes/storage';
import { StorageState, StorageActions } from '../types/storage';

const initialState = {
  storageData: {
    documents: [],
    total: 0,
  },
  queryParams: {
    skip: 0,
    limit: 15,
  },
  getDataPending: false,
  error: null,
  parentId: null,
  free: null,
  total: null,
  uploudQueue: [],
  itemInfo: null,
  itemInfoLoading: false,
  itemInfoError: null,
};

export const reducer = (state = initialState, action: StorageActions): StorageState => {
  switch (action.type) {
    case types.GET_STORAGE_DATA:
      return { ...state, getDataPending: true };
    case types.GET_STORAGE_DATA_SUCCESS:
      return {
        ...state,
        storageData: {
          documents: [...state.storageData.documents, ...action.payload.documents],
          total: action.payload.total,
        },
        getDataPending: false,
      };
    case types.GET_STORAGE_DATA_FAILURE:
      return { ...state, error: action.error, getDataPending: false };

    case types.GET_ITEM_INFO:
      return { ...state, itemInfoLoading: true };
    case types.GET_ITEM_INFO_SUCCESS:
      return {
        ...state,
        itemInfo: action.payload,
        itemInfoLoading: false,
      };
    case types.GET_ITEM_INFO_FAILURE:
      return { ...state, itemInfoError: action.error, itemInfoLoading: false };

    case types.SET_PARENTID:
      return { ...state, parentId: action.id };

    case types.SET_QUERY_PARAMS:
      return { ...state, queryParams: action.payload };

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

    case types.RESTORE_STORAGE_DATA:
      return {
        ...state,
        storageData: {
          documents: [],
          total: 0,
        },
      };

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
