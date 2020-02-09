import React from 'react';
import '../global.css';
import './Landing.css';
import { withRouter } from "react-router-dom";

class Landing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div className="Landing">
        <h1 className="LandingTitle">
          You Need to Hear This <span className="Italic">(Beta)</span>
        </h1>
        <h2 className="LandingSubTitle">
          Share and discover music you love
        </h2>
        <div className="LoginSignupContainer">
          <div
            className="Button LoginButton"
            onClick={() => { this.props.history.push("/login")}}
          >
            Login
          </div>
          <div
            className="Button SignupButton"
            onClick={() => { this.props.history.push("/signup") }}
          >
            Signup
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Landing);
