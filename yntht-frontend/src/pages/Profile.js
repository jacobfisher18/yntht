import React from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import '../global.css';
import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }

    this.logout = this.logout.bind(this)
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
  }

  logout() {
    const cookies = new Cookies();
    cookies.remove('user_id', { path: '/' });
    cookies.remove('username', { path: '/' });

    // force window reload to redirect to Landing
    window.location.reload();
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="Profile">
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >
          Profile</h1>
        <div
          className="LogoutButton"
          onClick={this.logout}>
          Logout
        </div>
      </div>
    )
  }
}

export default withRouter(Profile);
