import React from 'react';
import '../global.css';
import './Login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // To-Do: input validation
    alert(`Username: ${this.state.username}, password: ${this.state.password}`)
  }

  handleFormSubmit(event) {
    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  }

  // To-do: forgot password flow
  // To-do: add a link to create an account
  render() {
    return (
      <div className="Login">
        <h1 className="LoginTitle">
          Sign in to YNTHT
        </h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="FormContainer">
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
        </form>
      </div>
    )
  }
}

export default Login;
