import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrettyLogin from './components/auth/PrettyLogin';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrettyDashboard from './components/dashboard/PrettyDashboard';

import Pricing from './components/dashboard/Pricing';
import WorldMap from './components/dashboard/WorldMap';
import Analytics from './components/dashboard/Analytics';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  //<Route exact path='/login' component={Login} />
  //            <Alert />

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={PrettyLogin} />
            <PrivateRoute exact path='/dashboard' component={PrettyDashboard} />
            <PrivateRoute exact path='/analytics' component={Analytics} />
            <PrivateRoute exact path='/worldmap' component={WorldMap} />
            <PrivateRoute exact path='/pricing' component={Pricing} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
