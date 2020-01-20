import React from 'react';
import '../global.css';
import './Profile.css';

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
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
      </div>
    )
  }
}

export default Profile;
