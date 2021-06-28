import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { loadState, saveState } from '../libs/localStorage';

import { USER_LOGOUT_SUCCESS } from './actionTypes/auth';
import allReducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();
const store = createStore(allReducers, persistedState, composeEnhancer(applyMiddleware(thunk)));

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  });
});

window.addEventListener('storage', () => {
  const storageAuth = loadState().auth.authData;
  if (store.getState().auth.authData.accessToken !== storageAuth.accessToken) {
    if (!storageAuth.accessToken) {
      store.dispatch({ type: USER_LOGOUT_SUCCESS });
    }
  }
});

export default store;
