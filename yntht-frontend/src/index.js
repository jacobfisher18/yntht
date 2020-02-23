import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App from './routes/App';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Welcome from './routes/Welcome';
import Notfound from './routes/Notfound';

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
          component={Notfound}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));
