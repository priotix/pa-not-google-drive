import { combineReducers } from 'redux';
import auth from './auth';
import storage from './storage';

const allReducers = combineReducers({ auth, storage });

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
