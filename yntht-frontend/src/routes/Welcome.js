import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const history = useHistory();

  return (
    <div className="Welcome">
      <h1 className="WelcomeTitle">Welcome</h1>
      <h3 className="WelcomeSubtitle">Your account has been created.</h3>
      <div
        className="LetsStartButton"
        onClick={() => { history.push('/'); }}
      >
        LET&apos;S START
      </div>
    </div>
  );
};

export default withRouter(Welcome);
