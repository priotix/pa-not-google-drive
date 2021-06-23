import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/selectors/auth';

import Login from './components/Login';
import SignUp from './components/SignUp';

const App: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { isAuthenticated } = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    history.push('/');
  }, [isAuthenticated, history]);

  return isAuthenticated ? (
    <Switch>
      <Route path="/" component={() => <div />} />
    </Switch>
  ) : (
    <Switch>
      {/* Login Page */}
      <Route exact path="/login" component={() => <Login />} />
      <Route path="/sign-up" component={() => <SignUp />} />
      <Redirect push to={{ pathname: '/login', state: { from: location.pathname } }} />
    </Switch>
  );
};

export default App;
