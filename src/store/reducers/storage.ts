import * as types from '../actionTypes/storage';
import { StorageState, StorageActions } from '../types/storage';

const initialState = {
  storageData: {
    documents: [],
  },
  getDataPending: false,
  error: null,
  parentId: null,
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
    case types.SET_PARENTID:
      return { ...state, parentId: action.id };
    default:
      return state;
  }
};

export default reducer;
