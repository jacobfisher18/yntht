import React from 'react';
import '../global.css';
import './Feed.css';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="Feed">
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >
          Feed
        </h1>
      </div>
    );
  }
}

export default Feed;
