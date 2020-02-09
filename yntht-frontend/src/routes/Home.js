import React from 'react';
import Cookies from 'universal-cookie';
import Feed from '../pages/Feed.js';
import My3 from '../pages/My3.js';
import History from '../pages/History.js';
import Profile from '../pages/Profile.js';
import SearchResults from '../pages/SearchResults.js';
import Search from '../components/Search.js';
import { spotifySearchRequest } from '../api/spotifyClient.js';
import { getMy3ForUser } from '../api/my3Client.js';
import './Home.css';

const PAGES = {
  FEED: {
    name: "Feed",
    bgColor: "#BCA6CE",
    highlightColor: "#FCE849",
    presentInMenu: true,
  },
  MY3: {
    name: "My 3",
    bgColor: "#24316E",
    highlightColor: "#FCFF2B",
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
    bgColor: "#91DBCD",
    highlightColor: "#FA4739",
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
      loading: false,
      error: false,
      activeTab: PAGES.MY3.name,
      spotifySearchResults: {},
      spotifySearchIsLoading: false,
      spotifySearchIsInError: false,
      userID: 0,
      my3: [
        {
          title: null,
          artist: null,
          img: null,
          item_index: 0
        },
        {
          title: null,
          artist: null,
          img: null,
          item_index: 1
        },
        {
          title: null,
          artist: null,
          img: null,
          item_index: 2
        }
      ]
    }
  }

  componentDidMount() {
    // To-Do: get user profile from API or cookie or something and set state

    const cookies = new Cookies();
    const userID = cookies.get('user_id');
    if (!userID) {
      // To-Do: force to landing page; look into why this happened
    }

    this.setState({ userID }, () => {

      // get data
      this.setState({ loading: true })
      getMy3ForUser(this.state.userID).then(data => {
        this.setState({
          loading: false,
          my3: data.sort((a, b) => a.item_index < b.item_index).map(item => {
            return {
              title: item.title,
              artist: item.artist,
              img: item.img,
              item_index: item.item_index
            }
          })
        })
      }).catch(err => {
        this.setState({ loading: false, error: true })
      })

    })
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

  addSongToMy3(index, newSong) {
    this.setState(prevState => {
      return {
        my3: prevState.my3.map(currSong => currSong.item_index === index ? newSong : currSong),
      };
    })
  }

  replaceSongInMy3(index, newSong) {
    this.setState(prevState => {
      return {
        my3: prevState.my3.map(currSong => currSong.item_index === index ? { ...newSong, item_index: index} : currSong),
      };
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
            songs={this.state.my3}
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
            my3={this.state.my3}
            replaceSongInMy3={(oldSong, newSong) => this.replaceSongInMy3(oldSong, newSong)}
            addSongToMy3={(index, newSong) => this.addSongToMy3(index, newSong)}
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
    // TO-DO: add message at the top of the screen, and we should be able to fire a message at any time
    return (
      <div className="App">
        {
          this.state.loading ? <p>Loading...</p> :
            this.state.error ? <p>Error</p> :
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
        }
      </div>
    );
  }
}

export default App;
