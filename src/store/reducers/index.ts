import { combineReducers } from 'redux';
import auth from './auth';

const allReducers = combineReducers({ auth });

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
