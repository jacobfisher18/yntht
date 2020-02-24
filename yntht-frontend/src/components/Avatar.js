import React from 'react';
import { getColorFromString } from '../utilities/helpers';
import './Avatar.css';

const Avatar = ({ username }) => (
  <div className="Avatar" style={{ backgroundColor: getColorFromString(username) }}>
    <p className="AvatarText">
      {username.substr(0, 1).toUpperCase()}
    </p>
  </div>
);

export default Avatar;
