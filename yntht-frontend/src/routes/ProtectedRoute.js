import React from 'react';
import Cookies from 'universal-cookie';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, type, ...rest }) => {
  const cookies = new Cookies();
  const isAuthed = cookies.get('user_id');

  // Not accessible if you are logged in
  if (type === 'NO_AUTHED') {
    return (
      <Route
        {...rest}
        render={props =>
          !isAuthed ? (
            <Component {...props} />
          ) : (<Redirect
            to={{ pathname: "/" }}
          />)
        }
      />
    )
    // Only accessible if you are logged in
  } else if (type === 'AUTHED_ONLY') {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthed ? (
            <Component {...props} />
          ) : (<Redirect
            to={{ pathname: "/" }}
          />)
        }
      />
    )
    // Just a normal route
  } else {
    return (
      <Route
        {...rest}
        render={props => <Component {...props} />}
      />
    )
  }
};

export default ProtectedRoute;