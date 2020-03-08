import React from 'react';
import '../global.css';
import './History.css';

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="History">
        <h1
          className="PageTitle"
        >
          History
        </h1>
      </div>
    );
  }
}

export default History;
