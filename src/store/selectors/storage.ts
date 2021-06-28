import { RootState } from '../reducers/index';
import { StorageDataItem } from '../types/storage';

export const selectStorageData = (state: RootState): StorageDataItem[] => state.storage.storageData.documents;
export const selectParentId = (state: RootState): string | null => state.storage.parentId;
