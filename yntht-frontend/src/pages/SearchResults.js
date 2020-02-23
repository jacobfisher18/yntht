import React from 'react';
import Modal from 'react-modal';
import SongView from '../components/SongView.js';
import Loader from '../components/Loader';
import CloseImg from '../images/close.png';
import ErrorText from '../components/ErrorText';
import { putMy3ForUser } from '../api/my3Client';
import { getArtist, setBackgroundColor } from '../utilities/helpers';

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

  onlyUnique(value, index, self) {
    const matchingItems = self.filter((obj) => obj.name === value.name && getArtist(obj.artists) === getArtist(value.artists));

    return !(matchingItems.length >= 2 && matchingItems[0].id !== value.id);
  }

  songIsNull(song) {
    return (!song.title || !song.artist || !song.img);
  }

  renderResults() {
    if (!this.props.spotifySearchResults
      || !this.props.spotifySearchResults.tracks
      || !this.props.spotifySearchResults.tracks.items) {
      return (
        <ErrorText
          text="Something went wrong, please try refreshing the page."
        />
      );
    }

    if (this.props.spotifySearchResults.tracks.items.length === 0) {
      return (
        <ErrorText
          text={`Your search for "${this.props.searchedTerm}" returned zero results. Please try another search.`}
        />
      );
    }

    return (
      this.props.spotifySearchResults.tracks.items.filter(this.onlyUnique).map((track) => (
        <SongView
          key={track.id}
          size="S"
          title={track.name}
          artist={getArtist(track.artists)}
          img={track.album.images[0].url}
          onClick={() => {
            let isFull = true;
            let lowestEmptyIndex = 0;

            if (this.songIsNull(this.props.my3[0])) {
              isFull = false;
              lowestEmptyIndex = 0;
            } else if (this.songIsNull(this.props.my3[1])) {
              isFull = false;
              lowestEmptyIndex = 1;
            } else if (this.songIsNull(this.props.my3[2])) {
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

              putMy3ForUser(this.props.userID, newSong.title, newSong.artist, newSong.img, lowestEmptyIndex).then((result) => {
                if (result.error) {
                  this.props.notify('Error', 'Error adding song to My3');
                  return;
                }

                // Success
                this.props.putSongInMy3(lowestEmptyIndex, newSong);
                this.props.notify('Info', 'Song added to My3');
              }).catch((err) => {
                this.props.notify('Error', 'Error adding song to My3');
              });
            }
          }}
        />
      ))
    );
  }

  render() {
    const { bgColor } = this.props;

    setBackgroundColor(bgColor);

    return (
      <div className="SearchResults">
        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={() => { }}
          onRequestClose={() => { }}
          style={modalStyles}
          overlayClassName="ReplaceSongModalOverlay"
          ariaHideApp={false}
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
                this.props.my3.map((song) => (
                  <div
                    key={`${song.title}-${song.artist}-${song.item_index}`}
                    className="ReplaceSongModalSongContainer"
                  >
                    <div
                      className="ReplaceButton"
                      onClick={() => {
                        const newSong = this.state.selectedSong;

                        putMy3ForUser(this.props.userID, newSong.title, newSong.artist, newSong.img, song.item_index).then((result) => {
                          if (result.error) {
                            this.props.notify('Error', 'Error replacing song in My3');
                            this.setState({ isModalOpen: false });
                            return;
                          }

                          // Success
                          this.props.putSongInMy3(song.item_index, this.state.selectedSong);
                          this.setState({ isModalOpen: false });
                          this.props.notify('Info', 'Song replaced in My3');
                        }).catch((err) => {
                          console.log(err);
                          this.props.notify('Error', 'Error replacing song in My3');
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
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >
          Songs
        </h1>
        {
          this.props.spotifySearchIsLoading
            ? (
              <Loader
                loading={this.props.loading}
              />
            )
            : (
              <div className="SearchResultsContainer">
                {this.renderResults()}
              </div>
            )
        }
      </div>
    );
  }
}

export default SearchResults;
