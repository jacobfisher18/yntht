import React from 'react';
import { withRouter } from 'react-router-dom';
import { createUser } from '../api/usersClient';
import { setUserCookies } from '../utilities/helpers';
import { validateUsername, validatePassword, passwordMismatch } from '../utilities/validators';
import '../global.css';
import './LoginSignup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { username, password, confirmPassword } = this.state;

    const inputErrors = [
      validateUsername(username),
      validatePassword(password),
      passwordMismatch(password, confirmPassword),
    ];

    if (inputErrors.some((err) => err !== '')) {
      this.setState({ error: inputErrors.join(' ') });
      return;
    }

    createUser(username, password).then((result) => {
      if (result.error) {
        this.setState({ error: result.error }); // the actual error sent from the backend
      } else {
        setUserCookies(result.user_id, result.username);
        this.props.history.push('/welcome');
      }
    }).catch(() => { // an error with the actual request
      this.setState({ error: 'An error has occurred.' });
    });
  }

  render() {
    return (
      <div className="Signup">
        <h1 className="LoginSignupTitle">
          Create a YNTHT account
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="FormContainer">
            {
              this.state.error
              && <p className="ErrorMessage">{this.state.error}</p>
            }
            <p className="InputTitle UsernameTitle">Username</p>
            <input
              className="FormInput UsernameInput"
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <p className="InputTitle PasswordTitle">Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <p className="InputTitle PasswordTitle">Confirm Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={this.state.confirmPassword}
              onChange={(e) => this.setState({ confirmPassword: e.target.value })}
            />
            <input
              type="submit"
              value="Submit"
              className="SubmitButton"
              onClick={() => this.handleSubmit()}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
