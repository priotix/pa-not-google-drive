import { RootState } from '../reducers/index';
import { StorageDataItem } from '../types/storage';

export const selectStorageData = (state: RootState): StorageDataItem[] => state.storage.storageData.documents;
export const selectGetStorageDataPending = (state: RootState): boolean => state.storage.getDataPending;
export const selectParentId = (state: RootState): string | null => state.storage.parentId;
export const selectFreePlace = (state: RootState): number | null => state.storage.free;
export const selectTotalPlace = (state: RootState): number | null => state.storage.total;
export const selectUploudLoader = (state: RootState): boolean => state.storage.uploudLoader;
