import * as types from '../actionTypes/storage';
import { StorageState, StorageActions } from '../types/storage';

const initialState = {
  storageData: {},
  getDataPending: false,
  error: null,
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
    default:
      return state;
  }
};

export default reducer;
