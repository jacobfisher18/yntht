import React from 'react';
import Feed from './pages/Feed.js';
import My3 from './pages/My3.js';
import History from './pages/History.js';
import Profile from './pages/Profile.js';
import SearchResults from './pages/SearchResults.js';
import Search from './components/Search.js';
import { spotifySearchRequest } from './spotify/spotifyClient.js';
import './App.css';

const PAGES = {
  FEED: { 
    name: "Feed",
    bgColor: "#24316E",
    highlightColor: "#FCFF2B",
    presentInMenu: true,
  },
  MY3: {
    name: "My 3",
    bgColor: "#91DBCD",
    highlightColor: "#FA4739",
    presentInMenu: true,
  },
  HISTORY: {
    name: "History",
    bgColor: "#EF3EA5",
    highlightColor: "#CFF36E",
    presentInMenu: true,
  },
  PROFILE: {
    name: "Profile",
    bgColor: "#BCA6CE",
    highlightColor: "#FCE849",
    presentInMenu: true,
  },
  SEARCH_RESULTS: {
    name: "Search Results",
    bgColor: "#DA6990",
    highlightColor: "#0B6450",
    presentInMenu: false,
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: PAGES.MY3.name,
      spotifySearchResults: {},
      spotifySearchIsLoading: false,
      spotifySearchIsInError: false,
    }
  }

  selectTab(tab) {
    this.setState({ activeTab: tab });
  }

  renderMenu() {
    return Object.keys(PAGES).filter(key => PAGES[key].presentInMenu).map(key => {
      return (
        <div
          key={key}
          className={this.state.activeTab === PAGES[key].name ? "Black" : ""}
          onClick={() => this.selectTab(PAGES[key].name)}>
          {PAGES[key].name}
        </div>
      )
    })
  }

  renderTab() {
    switch (this.state.activeTab) {
      case PAGES.FEED.name:
        return (
          <Feed
            bgColor={PAGES.FEED.bgColor}
            highlightColor={PAGES.FEED.highlightColor}
          />
        )
      case PAGES.MY3.name:
        return (
          <My3
            bgColor={PAGES.MY3.bgColor}
            highlightColor={PAGES.MY3.highlightColor}
          />
        )
      case PAGES.HISTORY.name:
        return (
          <History
            bgColor={PAGES.HISTORY.bgColor}
            highlightColor={PAGES.HISTORY.highlightColor}
          />
        )
      case PAGES.PROFILE.name:
        return (
          <Profile
            bgColor={PAGES.PROFILE.bgColor}
            highlightColor={PAGES.PROFILE.highlightColor}
          />
        )
      case PAGES.SEARCH_RESULTS.name:
        return (
          <SearchResults
            bgColor={PAGES.SEARCH_RESULTS.bgColor}
            highlightColor={PAGES.SEARCH_RESULTS.highlightColor}
            spotifySearchResults={this.state.spotifySearchResults}
            spotifySearchIsLoading={this.state.spotifySearchIsLoading}
            spotifySearchIsInError={this.state.spotifySearchIsInError}
          />
        )
      default:
        return <p>Error</p>
    }
  }

  handleSearchSubmit(searchTerm) {
    this.selectTab(PAGES.SEARCH_RESULTS.name);

    this.setState({
      spotifySearchIsLoading: true,
      spotifySearchIsInError: false
    });

    spotifySearchRequest(searchTerm).then(res => {
      this.setState({ spotifySearchResults: res })
    }).catch(err => {
      this.setState({ spotifySearchIsInError: true });
    }).finally(() => {
      this.setState({ spotifySearchIsLoading: false });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="MainContentContainer">
          <div className="HeaderContainer">
            <Search
              onSubmit={(searchTerm) => this.handleSearchSubmit(searchTerm)}
            />
            <div className="NavMenu">
              {this.renderMenu()}
            </div>
          </div>
          <div className="PageContainer">
            {this.renderTab()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
