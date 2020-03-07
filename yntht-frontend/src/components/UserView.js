import React from 'react';
import Avatar from './Avatar';
import '../global.css';
import './UserView.css';

const UserView = ({
  username, onClick,
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
    </div>
  </div>
);

export default UserView;
