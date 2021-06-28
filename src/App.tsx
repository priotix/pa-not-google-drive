/* eslint-disable react/no-children-prop */
import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthData } from './store/selectors/auth';

import Login from './components/Login';
import SignUp from './components/SignUp';

const Layout = React.lazy(() => import('./components/Layout'));
const FileList = React.lazy(() => import('./components/FileList'));

const App: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(selectAuthData);
  const dispatch = useDispatch();

  const getParentId = (pathname) => {
    const parentIds = pathname.split('/');
    if (parentIds.length === 2) {
      dispatch({ type: 'SET_PARENTID', id: null });
      return;
    }
    dispatch({ type: 'SET_PARENTID', id: parentIds[parentIds.length - 1] });
  };

  useEffect(() => {
    getParentId(location.pathname);
  }, [location.pathname]);

  return isAuthenticated ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Switch>
          <Route path="/storage" children={(props) => props.match && <FileList />} />
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
