import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router-dom';
import UserView from '../components/UserView';
import SongView from '../components/SongView';
import Loader from '../components/Loader';
import CloseImg from '../images/close_dark.png';
import ErrorText from '../components/ErrorText';
import { putMy3ForUser } from '../api/my3Client';
import {
  getArtist, onlyUnique, songIsNull,
} from '../utilities/helpers';

import '../global.css';
import './SearchResults.css';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    boxSizing: 'border-box',
    boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.1)',
    display: 'flex',
    border: '1px',
  },
};

class SearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedSong: '',
    };
  }

  renderUsersResults() {
    const { usersSearchResults, searchedTerm, history } = this.props;

    if (usersSearchResults.length === 0) {
      return (
        <ErrorText
          text={`Your search for "${searchedTerm}" did not return any profiles.`}
        />
      );
    }

    return usersSearchResults.map((user) => (
      <div key={user.id}>
        <UserView
          username={user.username}
          onClick={() => { history.push(`user/${user.id}`); }}
        />
      </div>
    ));
  }

  renderSpotifyResults() {
    const {
      spotifySearchResults,
      searchedTerm,
      my3,
      userID,
      username,
      notify,
      putSongInMy3,
    } = this.props;

    if (!spotifySearchResults
      || !spotifySearchResults.tracks
      || !spotifySearchResults.tracks.items) {
      return (
        <ErrorText
          text="Something went wrong, please try refreshing the page."
        />
      );
    }

    if (spotifySearchResults.tracks.items.length === 0) {
      return (
        <ErrorText
          text={`Your search for "${searchedTerm}" did not return any songs.`}
        />
      );
    }

    return (
      spotifySearchResults.tracks.items.filter(onlyUnique).map((track) => (
        <SongView
          key={track.id}
          size="S"
          title={track.name}
          artist={getArtist(track.artists)}
          img={track.album.images[0].url}
          onClick={() => {
            let isFull = true;
            let lowestEmptyIndex = 0;

            if (songIsNull(my3[0])) {
              isFull = false;
              lowestEmptyIndex = 0;
            } else if (songIsNull(my3[1])) {
              isFull = false;
              lowestEmptyIndex = 1;
            } else if (songIsNull(my3[2])) {
              isFull = false;
              lowestEmptyIndex = 2;
            }

            if (isFull) {
              this.setState({
                isModalOpen: true,
                selectedSong: {
                  title: track.name,
                  artist: getArtist(track.artists),
                  img: track.album.images[0].url,
                },
              });
            } else {
              const newSong = {
                title: track.name,
                artist: getArtist(track.artists),
                img: track.album.images[0].url,
              };

              putMy3ForUser(userID, username, newSong.title, newSong.artist, newSong.img, lowestEmptyIndex).then((result) => {
                if (result.error) {
                  notify('Error', 'Error adding song to My3');
                  return;
                }

                // Success
                putSongInMy3(lowestEmptyIndex, newSong);
                notify('Info', 'Song added to My3');
              }).catch(() => {
                notify('Error', 'Error adding song to My3');
              });
            }
          }}
        />
      ))
    );
  }

  render() {
    const {
      my3,
      userID,
      username,
      notify,
      putSongInMy3,
      searchIsLoading,
      loading,
    } = this.props;
    const { isModalOpen, selectedSong } = this.state;

    return (
      <div className="SearchResults">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => this.setState({ isModalOpen: false })}
          style={modalStyles}
          overlayClassName="ReplaceSongModalOverlay"
          ariaHideApp={false}
          shouldCloseOnOverlayClick
        >
          <div className="ReplaceSongModalContentContainer">
            <div className="ReplaceSongModalHeaderContainer">
              <img
                src={CloseImg}
                alt="close"
                className="ReplaceSongCloseModal"
                onClick={() => this.setState({ isModalOpen: false })}
              />
              <h2 className="ReplaceSongModalTitle">Chose a song to replace</h2>
            </div>
            <div className="ReplaceSongModalSongsContainer">
              {
                my3.map((song) => (
                  <div
                    key={`${song.title}-${song.artist}-${song.item_index}`}
                    className="ReplaceSongModalSongContainer"
                  >
                    <div
                      className="ReplaceButton"
                      onClick={() => {
                        const newSong = selectedSong;

                        putMy3ForUser(userID, username, newSong.title, newSong.artist, newSong.img, song.item_index).then((result) => {
                          if (result.error) {
                            notify('Error', 'Error replacing song in My3');
                            this.setState({ isModalOpen: false });
                            return;
                          }

                          // Success
                          putSongInMy3(song.item_index, selectedSong);
                          this.setState({ isModalOpen: false });
                          notify('Info', 'Song replaced in My3');
                        }).catch((err) => {
                          console.log(err);
                          notify('Error', 'Error replacing song in My3');
                          this.setState({ isModalOpen: false });
                        });
                      }}
                    >
                      REPLACE
                    </div>
                    {song.title}
                  </div>
                ))
              }
            </div>
          </div>
        </Modal>
        {
          searchIsLoading
            ? (
              <Loader
                loading={loading}
              />
            )
            : (
              <div>
                <h1
                  className="PageTitle"
                >
                  Profiles
                </h1>
                <div className="SearchResultsContainer">
                  {this.renderUsersResults()}
                </div>
                <h1
                  className="PageTitle"
                >
                  Songs
                </h1>
                <div className="SearchResultsContainer">
                  {this.renderSpotifyResults()}
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default withRouter(SearchResults);
