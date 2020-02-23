import React from 'react';
import ErrorPage from '../pages/ErrorPage';

class Notfound extends React.Component {
  render() {
    return (
      <div>
        <ErrorPage
          type="NOT_FOUND"
        />
      </div>
    );
  }
}

export default Notfound;
