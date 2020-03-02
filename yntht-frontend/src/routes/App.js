import React from 'react';
import Home from './Home';
import Landing from './Landing';
import '../normalize.css';
import { getCurrentUserID } from '../utilities/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: getCurrentUserID(),
    };
  }

  render() {
    const { userID } = this.state;

    if (userID) {
      return <Home userID={userID} />;
    }
    return <Landing />;
  }
}

export default App;
