import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import App from './routes/App';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Notfound from './routes/Notfound';
import UserProfile from './routes/UserProfile';

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={App}
        />
        <ProtectedRoute
          path="/login"
          component={Login}
          type={'NO_AUTHED'}
        />
        <ProtectedRoute
          path="/signup"
          component={Signup}
          type={'NO_AUTHED'}
        />
        <ProtectedRoute
          path="/welcome"
          component={Welcome}
          type={'AUTHED_ONLY'}
        />
        <Route
          path="/user/:id"
          component={UserProfile}
        />
        <Route
          component={Notfound}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
