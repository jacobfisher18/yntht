import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import App from './routes/App';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Notfound from './routes/Notfound';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact path="/"
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
          component={Notfound}
        />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
