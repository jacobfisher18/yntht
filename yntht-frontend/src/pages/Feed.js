import React from 'react';
import { setBackgroundColor } from '../utilities/helpers';
import '../global.css';
import './Feed.css';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { bgColor, highlightColor } = this.props;

    setBackgroundColor(bgColor);

    return (
      <div className="Feed">
        <h1
          className="PageTitle"
          style={{ color: highlightColor }}
        >
          Feed
        </h1>
      </div>
    );
  }
}

export default Feed;
