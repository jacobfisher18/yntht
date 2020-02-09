import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Landing from './routes/Landing';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Notfound from './routes/Notfound';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

const authenticated = false; // To-Do: read from cookie

const routing = (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          exact path="/"
          component={authenticated ? App : Landing}
        />
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'))
