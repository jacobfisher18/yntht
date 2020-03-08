import React from 'react';
import { withRouter } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import Avatar from '../components/Avatar';
import { deleteUser } from '../api/usersClient';
import {
  logout, getCurrentUsername, getCurrentUserID,
} from '../utilities/helpers';
import '../global.css';
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: getCurrentUserID(), // maybe these should be props?
      username: getCurrentUsername(), // maybe these should be props?
      isModalOpen: false,
      deleteAccountError: '',
    };

    this.deleteAccount = this.deleteAccount.bind(this);
  }

  deleteAccount() {
    const { userID } = this.state;

    deleteUser(userID).then((res) => {
      if (res.error) {
        this.setState({ deleteAccountError: 'There was an error deleting your account.' });
        return;
      }

      logout();
    }).catch(() => {
      this.setState({ deleteAccountError: 'There was an error deleting your account.' });
    });
  }

  render() {
    const { isModalOpen, deleteAccountError, username } = this.state;

    return (
      <div className="Profile">
        <ConfirmModal
          title="Delete Account?"
          subtitle="Are you sure you want to delete your account forever?"
          actionText="Delete"
          isModalOpen={isModalOpen}
          error={deleteAccountError}
          confirmAction={this.deleteAccount}
          closeAction={() => { this.setState({ isModalOpen: false }); }}
        />
        <h1
          className="PageTitle"
        >
          Profile
        </h1>
        <div className="ProfileHeaderContainer">
          <Avatar username={username} size="L" />
          <div className="ProfileHeaderDetailsContainer">
            <div className="ProfileHeaderUsername">{username}</div>
            <div
              className="ProfileHeaderLogoutButton"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>

        <div className="ProfileFollowersFollowingContainer">
          <div className="ProfileListSectionContainer">
            <div className="ProfileSectionTitle">Followers</div>
            <div>Insert followers here</div>
          </div>
          <div className="ProfileListSectionContainer">
            <div className="ProfileSectionTitle">Following</div>
            <div>Insert following here</div>
          </div>
        </div>
        
        <div className="ProfileSectionTitle">Options</div>
        <div
          className="DeleteAccountButton"
          onClick={() => { this.setState({ isModalOpen: true }); }}
        >
          Delete Account
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
