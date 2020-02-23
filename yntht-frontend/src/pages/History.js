import React from 'react';
import { setBackgroundColor } from '../utilities/helpers';
import '../global.css';
import './History.css';

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { bgColor, highlightColor } = this.props;

    setBackgroundColor(bgColor);

    return (
      <div className="History">
        <h1
          className="PageTitle"
          style={{ color: highlightColor }}
        >
          History
        </h1>
      </div>
    );
  }
}

export default History;
