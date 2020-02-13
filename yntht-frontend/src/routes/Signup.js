import React from 'react';
import { createUser } from '../api/authClient';
import '../global.css';
import './LoginSignup.css';

class Signup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { username, password } = this.state;
    // TODO: input validation (i.e. do passwords match?)

    createUser(username, password).then(result => {
      if (result.status === "Created") {
        // TODO: go to a profile created page
      } else {
        this.setState({ error: "An unknown error has occurred." })
      }
    }).catch(err => {
      console.log(err);
      this.setState({ error: "An unknown error has occurred." })
    })
  }

  // handleFormSubmit(event) {
  //   alert('A name was submitted: ' + this.state.username);
  //   event.preventDefault();
  // }

  // TODO: add a link to login
  // TODO: confirm password
  // TODO: get enter key working
  render() {
    return (
      <div className="Signup">
        <h1 className="LoginSignupTitle">
          Create a YNTHT account
        </h1>
        {/* <form onSubmit={this.handleFormSubmit}> */}
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
            <p className="InputTitle PasswordTitle">Confirm Password</p>
            <input
              className="FormInput PasswordInput"
              type="password"
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
            <input
              type="submit"
              value="Submit"
              className="SubmitButton"
              onClick={() => this.handleSubmit()}
            />
          </div>
        {/* </form> */}
      </div>
    )
  }
}

export default Signup;
