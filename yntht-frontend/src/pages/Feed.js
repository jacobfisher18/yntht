import React from 'react';
import '../global.css';
import './Feed.css';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="Feed">
        <h1
          className="PageTitle"
        >
          Feed
        </h1>
      </div>
    );
  }
}

export default Feed;
