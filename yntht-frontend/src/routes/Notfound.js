import React from 'react';
import '../global.css';
import './Login.css';

class Notfound extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="Notfound">
        <h1 className="Notfound">
          Page Not Found
        </h1>
      </div>
    )
  }
}

export default Notfound;
