import React from 'react';
import Cookies from 'universal-cookie';
import Home from './Home';
import Landing from './Landing';

class App extends React.Component {

  constructor(props) {
    super(props);

    const cookies = new Cookies();

    this.state = {
      authenticated_id: cookies.get('user_id')
    }
  }

  render() {
    if (this.state.authenticated_id) {
      return <Home/>;
    } else {
      return <Landing />;
    }
  }
}

export default App;
