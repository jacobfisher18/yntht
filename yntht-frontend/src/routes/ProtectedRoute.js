import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUserID } from '../utilities/helpers';

const ProtectedRoute = ({ component: Component, type, ...rest }) => {
  const isAuthed = getCurrentUserID();

  // Not accessible if you are logged in
  if (type === 'NO_AUTHED') {
    return (
      <Route
        {...rest}
        render={(props) => (!isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/' }}
          />
        ))}
      />
    );
    // Only accessible if you are logged in
  } if (type === 'AUTHED_ONLY') {
    return (
      <Route
        {...rest}
        render={(props) => (isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/' }}
          />
        ))}
      />
    );
    // Just a normal route
  }
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />}
    />
  );
};

export default ProtectedRoute;
