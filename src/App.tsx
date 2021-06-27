import React, { Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/selectors/auth';

import Login from './components/Login';
import SignUp from './components/SignUp';

const Layout = React.lazy(() => import('./components/Layout'));
const FileList = React.lazy(() => import('./components/FileList'));

const App: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Switch>
          <Route path="/storage" component={() => <FileList />} />
          <Redirect to="/storage" />
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
