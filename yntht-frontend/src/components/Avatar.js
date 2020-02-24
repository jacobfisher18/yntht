import React from 'react';
import { AVATAR_COLORS } from '../utilities/constants';
import './Avatar.css';

const getColorFromString = (str) => {
  let sum = 0;
  let splitStr = str.split('');

  for (let i = 0; i < splitStr.length; i++) {
    sum += splitStr[i].charCodeAt(0);
  }

  const index = sum % AVATAR_COLORS.length;

  return AVATAR_COLORS[index];
}

const Avatar = ({ username }) => {
  return (
    <div className="Avatar" style={{ backgroundColor: getColorFromString(username) }}>
      <p className="AvatarText">
        {username.substr(0, 1).toUpperCase()}
      </p>
    </div>
  )
};

export default Avatar;
