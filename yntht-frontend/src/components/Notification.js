import React from 'react';
import checkImg from '../images/check_green.png';
import crossImg from '../images/close_red.png';
import exitImg from '../images/close_grey.png';
import './Notification.css';

class Notification extends React.Component {
  render() {
    return (
      <div
        className={
          `Notification 
          ${this.props.displayNotification ? 'Show' : 'Hide'} 
          ${this.props.notificationType}`
}
      >
        <img
          className="IconImg"
          src={this.props.notificationType === 'Info' ? checkImg
            : this.props.notificationType === 'Error' ? crossImg : ''}
          alt="Icon"
        />
        <p>{this.props.notificationText}</p>
        <img
          className="ExitImg"
          src={exitImg}
          alt="Exit"
          onClick={this.props.close}
        />
      </div>
    );
  }
}

export default Notification;
