import React from 'react';
import { withRouter } from "react-router-dom";
import { setUserCookies } from '../utilities/helpers';
import { authUser } from '../api/usersClient';
import '../global.css';
import './LoginSignup.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { username, password } = this.state;

    authUser(username, password).then(result => {
      if (result.error) {
        this.setState({ error: result.error }); // the actual error sent from the backend
      } else {
        // success
        this.setState({ error: "" });
        setUserCookies(result.user_id, result.username);
        this.props.history.push("/"); // redirect to app
      }
    }).catch(() => { // an error with the actual request
      this.setState({ error: "An error has occurred." });
    });
  }

  render() {
    return (
      <div className="Login">
        <h1 className="LoginSignupTitle">
          Sign in to YNTHT
        </h1>
        <form onSubmit={e => e.preventDefault()}>
          <div className="FormContainer">
            {
              this.state.error &&
              <p className="ErrorMessage">{this.state.error}</p>
            }
            <p className="InputTitle UsernameTitle">Username</p>
            <input
              className="FormInput UsernameInput"
              type="text"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <p className="InputTitle PasswordTitle">Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            <input
              type="submit"
              value="Submit"
              className="SubmitButton"
              onClick={() => this.handleSubmit()}
            />
          </div>
          <div className="NewHereContainer">
            New here? <span
              className="CreateAnAccountLink"
              onClick={() => { this.props.history.push("/signup") }}
            >Create an account.</span>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
