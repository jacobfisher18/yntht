import React from 'react';
import '../global.css';
import './History.css';

class History extends React.Component {

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
      <div className="History">
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >
          History</h1>
      </div>
    )
  }
}

export default History;
