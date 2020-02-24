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
    const { history } = this.props;
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
        history.push('/welcome');
      }
    }).catch(() => { // an error with the actual request
      this.setState({ error: 'An error has occurred.' });
    });
  }

  render() {
    const {
      error,
      username,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div className="Signup">
        <h1 className="LoginSignupTitle">
          Create a YNTHT account
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="FormContainer">
            {
              error
              && <p className="ErrorMessage">{error}</p>
            }
            <p className="InputTitle UsernameTitle">Username</p>
            <input
              className="FormInput UsernameInput"
              type="text"
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <p className="InputTitle PasswordTitle">Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <p className="InputTitle PasswordTitle">Confirm Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={confirmPassword}
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
