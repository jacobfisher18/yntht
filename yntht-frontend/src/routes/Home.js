import React from 'react';
import Feed from '../pages/Feed';
import My3 from '../pages/My3';
import History from '../pages/History';
import Profile from '../pages/Profile';
import SearchResults from '../pages/SearchResults';
import ErrorPage from '../pages/ErrorPage';
import Search from '../components/Search';
import Notification from '../components/Notification';
import { spotifySearchRequest } from '../api/spotifyClient';
import { searchUsers } from '../api/usersClient';
import { getMy3ForUser } from '../api/my3Client';
import { PAGES } from '../utilities/constants';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: PAGES.MY3.name,
      showErrorPage: false,
      spotifySearchResults: {},
      usersSearchResults: [],
      searchIsLoading: false,
      my3IsLoading: false,
      searchedTerm: '', // just for passing to SearchResults
      my3: [
        {
          title: null,
          artist: null,
          img: null,
          item_index: 0,
        },
        {
          title: null,
          artist: null,
          img: null,
          item_index: 1,
        },
        {
          title: null,
          artist: null,
          img: null,
          item_index: 2,
        },
      ],
      notificationText: '',
      notificationType: '',
      displayNotification: false,
    };

    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    const { userID } = this.props;

    this.setState({ my3IsLoading: true });

    getMy3ForUser(userID).then((result) => {
      if (result.error) {
        this.setState({ my3IsLoading: false, showErrorPage: true });
        return;
      }

      // success
      this.setState({
        my3IsLoading: false,
        my3: result.data.sort((a, b) => a.item_index < b.item_index).map((item) => ({
          title: item.title,
          artist: item.artist,
          img: item.img,
          item_index: item.item_index,
        })),
      });
    }).catch(() => {
      this.setState({ my3IsLoading: false, showErrorPage: true });
    });
  }

  selectTab(tab) {
    this.setState({ activeTab: tab });
  }

  // works for adding a new song (since empty items already exist), or replacing a song
  // it's the caller's responsibility to only call this with the lowest empty index if putting a new song
  putSongInMy3(index, newSong) {
    this.setState((prevState) => ({
      my3: prevState.my3.map((currSong) => (currSong.item_index === index ? { ...newSong, item_index: index } : currSong)),
    }));
  }

  handleSearchSubmit(searchTerm) {
    this.selectTab(PAGES.SEARCH_RESULTS.name);

    this.setState({
      searchIsLoading: true,
    });

    Promise.all([spotifySearchRequest(searchTerm), searchUsers(searchTerm)]).then((values) => {
      const spotifySearchResults = values[0];
      const usersSearchResults = values[1];

      if (spotifySearchResults.error || usersSearchResults.error) {
        this.setState({ showErrorPage: true });
        return;
      }

      this.setState({
        spotifySearchResults,
        usersSearchResults: usersSearchResults.data,
        searchedTerm: searchTerm,
      });
    }).catch(() => {
      this.setState({ showErrorPage: true });
    }).finally(() => {
      this.setState({ searchIsLoading: false });
    });
  }

  notify(type, message) {
    const { displayNotification } = this.state;

    if (displayNotification) {
      console.log(`Notification already displayed. New message: ${message}`);
    } else {
      this.setState({
        displayNotification: true,
        notificationType: type,
        notificationText: message,
      });

      setTimeout(() => {
        this.setState({
          displayNotification: false,
          // don't reset type or text, because they are needed during the transition
        });
      }, 3000);
    }
  }

  renderTab() {
    const { userID } = this.props;

    const {
      activeTab,
      my3,
      my3IsLoading,
      searchedTerm,
      spotifySearchResults,
      usersSearchResults,
      searchIsLoading,
    } = this.state;

    switch (activeTab) {
      case PAGES.FEED.name:
        return (
          <Feed
            bgColor={PAGES.FEED.bgColor}
            highlightColor={PAGES.FEED.highlightColor}
          />
        );
      case PAGES.MY3.name:
        return (
          <My3
            bgColor={PAGES.MY3.bgColor}
            highlightColor={PAGES.MY3.highlightColor}
            songs={my3}
            loading={my3IsLoading}
          />
        );
      case PAGES.HISTORY.name:
        return (
          <History
            bgColor={PAGES.HISTORY.bgColor}
            highlightColor={PAGES.HISTORY.highlightColor}
          />
        );
      case PAGES.PROFILE.name:
        return (
          <Profile
            bgColor={PAGES.PROFILE.bgColor}
            highlightColor={PAGES.PROFILE.highlightColor}
          />
        );
      case PAGES.SEARCH_RESULTS.name:
        return (
          <SearchResults
            bgColor={PAGES.SEARCH_RESULTS.bgColor}
            highlightColor={PAGES.SEARCH_RESULTS.highlightColor}
            searchedTerm={searchedTerm}
            userID={userID}
            spotifySearchResults={spotifySearchResults}
            usersSearchResults={usersSearchResults}
            searchIsLoading={searchIsLoading}
            my3={my3}
            putSongInMy3={(index, newSong) => this.putSongInMy3(index, newSong)}
            notify={this.notify}
          />
        );
      default:
        return <p>Error</p>;
    }
  }

  renderMenu() {
    const { activeTab } = this.state;

    return Object.keys(PAGES).filter((key) => PAGES[key].presentInMenu).map((key) => (
      <div
        key={key}
        className={activeTab === PAGES[key].name ? 'Black' : ''}
        onClick={() => this.selectTab(PAGES[key].name)}
      >
        {PAGES[key].name}
      </div>
    ));
  }

  render() {
    const {
      displayNotification,
      notificationType,
      notificationText,
      showErrorPage,
    } = this.state;

    return (
      <div className="App">
        <Notification
          displayNotification={displayNotification}
          notificationType={notificationType}
          notificationText={notificationText}
          close={() => { this.setState({ displayNotification: false }); }}
        />
        {
          showErrorPage
            ? (
              <ErrorPage
                type="OOPS"
              />
            )
            : (
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
            )
        }
      </div>
    );
  }
}

export default Home;
