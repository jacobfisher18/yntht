import React from 'react';
import { getColorFromString } from '../utilities/helpers';
import './Avatar.css';

const Avatar = ({ username, size }) => (
  <div className={`Avatar Avatar-${size}`} style={{ backgroundColor: getColorFromString(username) }}>
    <p className={`AvatarText AvatarText-${size}`}>
      {username.substr(0, 1).toUpperCase()}
    </p>
  </div>
);

export default Avatar;
