import React from 'react';
import { withRouter } from 'react-router-dom';
import { setBackgroundColor } from '../utilities/helpers';
import { getMy3ForUser } from '../api/my3Client';
import { getUser } from '../api/usersClient';
import Loader from '../components/Loader';
import SongView from '../components/SongView';
import ErrorText from '../components/ErrorText';
import '../global.css';
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      songs: [],
      username: '',
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // eslint-disable-line

    getUser(id).then((userResult) => {
      if (userResult.error) {
        this.setState({ loading: false, error: true });
        return;
      }

      // success
      this.setState({
        username: userResult.data.username,
      });

      getMy3ForUser(id).then((result) => {
        if (result.error) {
          this.setState({ loading: false, error: true });
          return;
        }

        // success
        this.setState({
          loading: false,
          songs: result.data.sort((a, b) => a.item_index < b.item_index).map((item) => ({
            title: item.title,
            artist: item.artist,
            img: item.img,
            item_index: item.item_index,
          })),
        });
      }).catch(() => {
        this.setState({ loading: false, error: true });
      });
    }).catch(() => {
      this.setState({ loading: false, error: true });
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

  render() {
    const bgColor = '#24316E';
    setBackgroundColor(bgColor);

    const { loading, error, username } = this.state;
    const { history } = this.props;

    return (
      <div className="UserProfile">
        <div className="MainContentContainer">
          <div className="PageContainer">
            {
              error ? <ErrorText text="Error loading this user profile." />
                : loading
                  ? (
                    <Loader
                      loading={loading}
                    />
                  )
                  : (
                    <div>
                      <div
                        className="HomeButton"
                        onClick={() => { history.push('/'); }}
                      >
                        YNTHT
                      </div>
                      <div className="UserProfileHeaderContainer">
                        <p className="UserProfileInfoText">
                          USER • 0 FOLLOWERS • 0 FOLLOWING
                        </p>
                        <p className="UserProfileUsername">{username}</p>
                        <div className="UserProfileFollowButton">FOLLOW</div>
                        {/* TODO: disable the follow button if user is not logged in */}
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
      </div>
    );
  }
}

export default withRouter(UserProfile);
