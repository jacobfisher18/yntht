import React from 'react';
import Feed from '../pages/Feed.js';
import My3 from '../pages/My3.js';
import History from '../pages/History.js';
import Profile from '../pages/Profile.js';
import SearchResults from '../pages/SearchResults.js';
import ErrorPage from '../pages/ErrorPage.js';
import Search from '../components/Search.js';
import Notification from '../components/Notification';
import { spotifySearchRequest } from '../api/spotifyClient.js';
import { getMy3ForUser } from '../api/my3Client.js';
import { PAGES } from '../utilities/constants.js';
import './Home.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: PAGES.MY3.name,
      showErrorPage: false,
      spotifySearchResults: {},
      spotifySearchIsLoading: false,
      my3IsLoading: false,
      searchedTerm: '', // just for passing to SearchResults
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
      ],
      notificationText: '',
      notificationType: '',
      displayNotification: false
    }

    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    this.setState({ my3IsLoading: true })
    getMy3ForUser(this.props.userID).then(data => {
      this.setState({
        my3IsLoading: false,
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
      console.log(err);
      this.setState({ my3IsLoading: false, showErrorPage: true })
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
        my3: prevState.my3.map(currSong => currSong.item_index === index ? { ...newSong, item_index: index } : currSong),
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
            loading={this.state.my3IsLoading}
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
            searchedTerm={this.state.searchedTerm}
            userID={this.props.userID}
            spotifySearchResults={this.state.spotifySearchResults}
            spotifySearchIsLoading={this.state.spotifySearchIsLoading}
            my3={this.state.my3}
            replaceSongInMy3={(index, newSong) => this.replaceSongInMy3(index, newSong)}
            addSongToMy3={(index, newSong) => this.addSongToMy3(index, newSong)}
            notify={this.notify}
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
    });

    spotifySearchRequest(searchTerm).then(res => {
      this.setState({
        spotifySearchResults: res,
        searchedTerm: searchTerm
      })
    }).catch(err => {
      console.log(err);
      this.setState({ showErrorPage: true });
    }).finally(() => {
      this.setState({ spotifySearchIsLoading: false });
    })
  }

  notify(type, message) {
    if (this.state.displayNotification) {
      console.log(`Notification already displayed. New message: ${message}`);
    } else {
      this.setState({
        displayNotification: true,
        notificationType: type,
        notificationText: message,
      })

      setTimeout(() => {
        this.setState({
          displayNotification: false,
          // don't reset type or text, because they are needed during the transition
        })
      }, 3000);
    }
  }

  render() {
    return (
      <div className="App">
        <Notification
          displayNotification={this.state.displayNotification}
          notificationType={this.state.notificationType}
          notificationText={this.state.notificationText}
          close={() => { this.setState({ displayNotification: false })}}
        />
        {
          this.state.showErrorPage ?
            <ErrorPage
              type={'OOPS'}
            /> :
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
