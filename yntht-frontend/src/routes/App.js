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
    if (this.state.userID) {
      return <Home userID={this.state.userID} />;
    }
    return <Landing />;
  }
}

export default App;
