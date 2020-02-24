import React from 'react';
import Avatar from './Avatar';
import '../global.css';
import './UserView.css';

const UserView = ({
  username, followers, onClick
}) => (
    <div
      className="UserViewContainer"
      onClick={onClick}
    >
      <Avatar
        username={username}
      />
      <div className="UserViewUserDetailsContainer">
        <p className="UserViewUsername">
          {username}
        </p>
        <p className="UserViewFollowers">
          {followers} followers
        </p>
      </div>
    </div>
  );

export default UserView;
