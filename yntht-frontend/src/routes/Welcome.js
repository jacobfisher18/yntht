import React from 'react';
import { withRouter } from "react-router-dom";
import './Welcome.css';
import Cookies from 'universal-cookie';

class Welcome extends React.Component {
  render() {
    const cookies = new Cookies();
    if (!cookies.get('user_id')) {
      this.props.history.push('/')
    }
    return (
      <div className="Welcome">
        <h1 className="WelcomeTitle">Welcome</h1>
        <h3 className="WelcomeSubtitle">Your account has been created.</h3>
        <div
          className="LetsStartButton"
          onClick={() => { this.props.history.push('/') }}
        >
          LET'S START
        </div>
      </div>
    )
  }
}

export default withRouter(Welcome);
