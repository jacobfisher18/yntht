import React from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from "react-router-dom";
import '../global.css';
import './Login.css';
import { authUser } from '../api/authClient';

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
    // TODO: input validation
    // alert(`Username: ${this.state.username}, password: ${this.state.password}`)

    authUser(username, password).then(result => {
      // handle all the cases
      switch (result.status) {
        case "Not Found":
          this.setState({ error: "That username was not found." })
          break;
        case "Error":
          this.setState({ error: "An unknown error has occurred." })
          break;
        case "Incorrect Password":
          this.setState({ error: "The password you entered is incorrect." })
          break;
        case "Found":
          // success, we can move forward
          this.setState({ error: "" })

          // set a cookie to log in
          const cookies = new Cookies();
          cookies.set('user_id', result.user_id, { path: '/' });
          cookies.set('username', result.username, { path: '/' });

          // redirect to app
          this.props.history.push("/");
          break;
        default:
          this.setState({ error: "An unknown error has occurred." })
      }
    }).catch(err => {
      this.setState({ error: "An unknown error has occurred." })
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.handleSubmit();
  }

  // TODO: forgot password flow
  // TODO: add a link to create an account
  // TODO: get enter key working
  render() {
    return (
      <div className="Login">
        <h1 className="LoginTitle">
          Sign in to YNTHT
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

export default withRouter(Login);
