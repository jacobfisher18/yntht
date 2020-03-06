import React from 'react';
import { withRouter } from 'react-router-dom';
import { setBackgroundColor, isLoggedIn, getCurrentUserID } from '../utilities/helpers';
import { getMy3ForUser } from '../api/my3Client';
import { getUser } from '../api/usersClient';
import Header from '../components/Header';
import Loader from '../components/Loader';
import SongView from '../components/SongView';
import ErrorText from '../components/ErrorText';
import ConfirmModal from '../components/ConfirmModal';

import {
  getFollowers, getFollowing, addFollower, removeFollower,
} from '../api/followersClient';
import '../global.css';
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsLoading: false,
      followIsLoading: false,
      isFollowing: false,
      isSelf: false,
      followerCount: 0,
      followingCount: 0,
      error: '',
      songs: [],
      username: '',
      userID: 0,
      unfollowModalVisible: false,
    };

    this.renderFollowButton = this.renderFollowButton.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
  }

  componentDidMount() {
    let { id: string_id } = this.props.match.params; // eslint-disable-line
    const id = Number(string_id);
    const currentID = getCurrentUserID();

    this.setState({ userIsLoading: true });

    const promises = [
      getUser(id),
      getFollowers(id),
      getFollowing(id),
      getMy3ForUser(id),
    ];

    Promise.all(promises).then((results) => {
      if (results[0].error) {
        this.setState({
          userIsLoading: false,
          error: 'Error getting user.',
        });
        return;
      } if (results[1].error || results[2].error) {
        this.setState({
          userIsLoading: false,
          error: 'Error getting follower information.',
        });
        return;
      } if (results[3].error) {
        this.setState({
          userIsLoading: false,
          error: 'Error getting song information.',
        });
        return;
      }

      this.setState({
        userIsLoading: false,
        userID: id,
        username: results[0].data.username,
        followerCount: results[1].data.length,
        followingCount: results[2].data.length,
        isFollowing: results[1].data.some((item) => item.id === currentID),
        isSelf: id === currentID,
        songs: results[3].data.sort((a, b) => a.item_index < b.item_index).map((item) => ({
          title: item.title,
          artist: item.artist,
          img: item.img,
          item_index: item.item_index,
        })),
      });
    }).catch(() => {
      this.setState({ userIsLoading: false, error: true });
    });
  }

  followUser() {
    const { userID, followerCount } = this.state;

    this.setState({ followIsLoading: true });

    addFollower(getCurrentUserID(), userID).then((result) => {
      if (result.error) {
        this.setState({ error: true, followIsLoading: false });
        return;
      }

      this.setState({
        followIsLoading: false,
        isFollowing: true,
        followerCount: followerCount + 1,
      });
    }).catch(() => {
      this.setState({ error: true, followIsLoading: false });
    });
  }

  unfollowUser() {
    const { userID, followerCount } = this.state;

    this.setState({ followIsLoading: true });

    removeFollower(getCurrentUserID(), userID).then((result) => {
      if (result.error) {
        this.setState({ error: true, followIsLoading: false, unfollowModalVisible: false });
        return;
      }

      this.setState({
        followIsLoading: false,
        unfollowModalVisible: false,
        isFollowing: false,
        followerCount: followerCount - 1,
      });
    }).catch(() => {
      this.setState({ error: true, followIsLoading: false, unfollowModalVisible: false });
    });
  }

  renderSongs() {
    const { songs } = this.state;

    return songs
      .filter((song) => song.title && song.artist && song.img)
      .map((song) => (
        <SongView
          key={`${song.title}-${song.artist}-${song.item_index}`}
          size="M"
          title={song.title}
          artist={song.artist}
          img={song.img}
        />
      ));
  }

  renderFollowButton() {
    const { followIsLoading, isFollowing, isSelf } = this.state;

    if (!isLoggedIn() || isSelf) {
      return (
        <div />
      );
    }

    if (followIsLoading) {
      return (
        <div className="FollowButton">
          {/* we can add a spinner if we want */}
        </div>
      );
    }

    if (isFollowing) {
      return (
        <div
          className="FollowButton FollowButtonFollowing"
          onClick={() => this.setState({ unfollowModalVisible: true })}
        >
          UNFOLLOW
        </div>
      );
    }

    return (
      <div
        className="FollowButton FollowButtonNotFollowing"
        onClick={this.followUser}
      >
        FOLLOW
      </div>
    );
  }

  render() {
    const bgColor = '#24316E';
    setBackgroundColor(bgColor);

    const {
      userIsLoading, error, username, followerCount, followingCount, unfollowModalVisible,
    } = this.state;

    return (
      <div className="UserProfile">
        <ConfirmModal
          title="Unfollow User"
          subtitle="Are you sure you want to unfollow this user?"
          actionText="Unfollow"
          isModalOpen={unfollowModalVisible}
          error="" // we can add error handling in the future for this if needed
          confirmAction={this.unfollowUser}
          closeAction={() => { this.setState({ unfollowModalVisible: false }); }}
        />
        <Header
          handleSearchSubmit={() => { }}
        />
        <div className="UserProfileContentContainer">
          {
              error ? <ErrorText text={error} />
                : userIsLoading
                  ? (
                    <Loader
                      loading={userIsLoading}
                    />
                  )
                  : (
                    <div>
                      <div className="UserProfileHeaderContainer">
                        <p className="UserProfileInfoText">
                          USER •
                          {' '}
                          {followerCount}
                          {' '}
                          FOLLOWERS •
                          {' '}
                          {followingCount}
                          {' '}
                          FOLLOWING
                        </p>
                        <p className="UserProfileUsername">{username}</p>
                        {this.renderFollowButton()}
                      </div>
                      <h1
                        className="Their3Title"
                      >
                        Their 3
                      </h1>
                      {this.renderSongs()}
                    </div>
                  )
            }
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
