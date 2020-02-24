import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
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
        <Route
          path="/login"
          component={Login}
        />
        <Route
          path="/signup"
          component={Signup}
        />
        <Route
          path="/welcome"
          component={Welcome}
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
