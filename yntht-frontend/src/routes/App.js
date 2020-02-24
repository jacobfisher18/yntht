import React from 'react';
import Cookies from 'universal-cookie';
import Home from './Home';
import Landing from './Landing';
import '../normalize.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.state = {
      userID: cookies.get('user_id'),
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
