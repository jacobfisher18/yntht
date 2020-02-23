import React from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import ConfirmModal from '../components/ConfirmModal';
import { deleteUser } from '../api/usersClient';
import '../global.css';
import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.state = {
      user_id: cookies.get('user_id'), // maybe these should be props?
      username: cookies.get('username'), // maybe these should be props?
      isModalOpen: false,
      deleteAccountError: ''
    }

    this.logout = this.logout.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
  }

  logout() {
    const cookies = new Cookies();
    cookies.remove('user_id', {
      path: '/',
      domain: process.env.NODE_ENV === "production" ? '.yntht.net' : 'localhost'
    });
    cookies.remove('username', {
      path: '/',
      domain: process.env.NODE_ENV === "production" ? '.yntht.net' : 'localhost'
    });

    // force window reload to redirect to Landing
    window.location.reload();
  }

  deleteAccount() {
    deleteUser(this.state.user_id).then(res => {
      if (res.error) {
        this.setState({ deleteAccountError: 'There was an error deleting your account.' });
        return;
      }

      this.logout();
    }).catch(() => {
      this.setState({ deleteAccountError: 'There was an error deleting your account.' });
    })
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="Profile">
        <ConfirmModal
          title="Delete Account?"
          subtitle="Are you sure you want to delete your account forever?"
          actionText="Delete"
          isModalOpen={this.state.isModalOpen}
          error={this.state.deleteAccountError}
          confirmAction={this.deleteAccount}
          closeAction={() => { this.setState({ isModalOpen: false }) }}
        />
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >
          Profile</h1>
        <h2 className="HelloNameTitle">Hello, {this.state.username}</h2>
        <div
          className="LogoutButton"
          onClick={this.logout}>
          Logout
        </div>
        <div
          className="DeleteAccountButton"
          onClick={() => { this.setState({ isModalOpen: true }) }}
        >
          Delete Account
        </div>
      </div>
    )
  }
}

export default withRouter(Profile);
