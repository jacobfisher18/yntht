import React from 'react';
import Home from './Home';
import Landing from './Landing';
import '../normalize.css';
import { getCurrentUserID, getCurrentUsername } from '../utilities/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: getCurrentUserID(),
      username: getCurrentUsername(),
    };
  }

  render() {
    const { userID, username } = this.state;

    if (userID) {
      return <Home userID={userID} username={username} />;
    }
    return <Landing />;
  }
}

export default App;
