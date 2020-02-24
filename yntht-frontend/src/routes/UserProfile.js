import React from 'react';
import { withRouter } from 'react-router-dom';
import { setBackgroundColor } from '../utilities/helpers';
import { getMy3ForUser } from '../api/my3Client';
import Loader from '../components/Loader';
import SongView from '../components/SongView';
import '../global.css';
import './UserProfile.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false, // TODO: figure out how to deal with an error on this page
      songs: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; // eslint-disable-line

    // TODO: get username (and maybe followers and such) first, populate that into state
    // If there's no user with this ID, send a 404 page

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
    const highlightColor = '#FCFF2B';
    setBackgroundColor(bgColor);

    const { loading } = this.state;

    return (
      <div className="UserProfile">
        <div className="MainContentContainer">
          <div className="PageContainer">
            <h1
              className="PageTitle"
              style={{ color: highlightColor }}
            >
              Songs
            </h1>
            {
              loading
                ? (
                  <Loader
                    loading={loading}
                  />
                )
                : this.renderSongs()
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
