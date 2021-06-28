import { RootState } from '../reducers/index';
import { AuthState } from '../types/auth';

export const selectAuthData = (state: RootState): AuthState => state.auth;
