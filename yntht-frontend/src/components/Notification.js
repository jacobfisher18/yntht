import React from 'react';
import checkImg from '../images/check_green.png';
import crossImg from '../images/close_red.png';
import exitImg from '../images/close_grey.png';
import './Notification.css';

const Notification = ({
  displayNotification, notificationType, notificationText, close,
}) => (
  <div
    className={
      `Notification 
          ${displayNotification ? 'Show' : 'Hide'} 
          ${notificationType}`
    }
  >
    <img
      className="IconImg"
      src={notificationType === 'Info' ? checkImg
        : notificationType === 'Error' ? crossImg : ''}
      alt="Icon"
    />
    <p>{notificationText}</p>
    <img
      className="ExitImg"
      src={exitImg}
      alt="Exit"
      onClick={close}
    />
  </div>
);

export default Notification;
