import { RootState } from '../reducers/index';
import { AuthState } from '../types/auth';

export const selectIsAuthenticated = (state: RootState): AuthState => state.auth;
