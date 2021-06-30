import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuthData } from './store/selectors/auth';
import { setQueryParams } from './store/actions/storage';
import { getParentId } from './libs/getParentId';

import Login from './components/Login';
import SignUp from './components/SignUp';

import LazyLoadFallback from './containers/LazyLoadFallback';

const Layout = React.lazy(() => import('./containers/Layout'));
const Storage = React.lazy(() => import('./containers/Storage'));

const App: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(selectAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    const parentId = getParentId(location.pathname);
    dispatch({ type: 'SET_PARENTID', id: parentId });
    if (location.pathname === '/login') {
      dispatch(setQueryParams(0, 15));
      dispatch({ type: 'RESTORE_STORAGE_DATA' });
    }
  }, [location.pathname]);

  return isAuthenticated ? (
    <Suspense fallback={<LazyLoadFallback />}>
      <Layout>
        <Switch>
          <Route path="/storage" children={(props) => props.match && <Storage />} />
          <Redirect push to={{ pathname: '/storage', state: { from: location.pathname } }} />
        </Switch>
      </Layout>
    </Suspense>
  ) : (
    <Switch>
      <Route exact path="/login" component={() => <Login />} />
      <Route path="/sign-up" component={() => <SignUp />} />
      <Redirect push to={{ pathname: '/login', state: { from: location.pathname } }} />
    </Switch>
  );
};

export default App;
