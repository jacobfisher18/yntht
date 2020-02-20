import React from 'react';
import SongView from '../components/SongView.js';
import Modal from 'react-modal';
import Loader from '../components/Loader';
import CloseImg from '../images/close.png';
import ErrorText from '../components/ErrorText';
import { putMy3ForUser } from '../api/songsClient';
import { getArtist } from '../utilities/helpers';
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
  }
};

class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedSong: '',
    }
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
  }

  onlyUnique(value, index, self) {
    const matchingItems = self.filter((obj) => obj.name === value.name && getArtist(obj.artists) === getArtist(value.artists));

    return !(matchingItems.length >= 2 && matchingItems[0].id !== value.id);
  }

  songIsNull(song) {
    return (!song.title || !song.artist || !song.img)
  }

  renderResults() {
    if (!this.props.spotifySearchResults ||
      !this.props.spotifySearchResults.tracks ||
      !this.props.spotifySearchResults.tracks.items) {
      return (
        <ErrorText
          text="Something went wrong, please try refreshing the page."
        />
      )
    }

    if (this.props.spotifySearchResults.tracks.items.length === 0) {
      return (
        <ErrorText
          text={`Your search for "${this.props.searchedTerm}" returned zero results. Please try another search.`}
        />
      )
    }

    return (
      this.props.spotifySearchResults.tracks.items.filter(this.onlyUnique).map(track => {
        return (
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
                  }
                })
              } else {
                const newSong = {
                  title: track.name,
                  artist: getArtist(track.artists),
                  img: track.album.images[0].url,
                };

                putMy3ForUser(this.props.userID, newSong.title, newSong.artist, newSong.img, lowestEmptyIndex).then(res => {
                  this.props.addSongToMy3(lowestEmptyIndex, newSong);
                  this.props.notify('Info', 'Song added to My3');
                }).catch(err => {
                  console.log(err);
                  this.props.notify('Error', 'Error adding song to My3');
                })
              }
            }
            }
          />
        )
      })
    )
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="SearchResults">
        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={() => { }}
          onRequestClose={() => { }}
          style={modalStyles}
          contentLabel="Example Modal"
          overlayClassName="ModalOverlay"
          ariaHideApp={false}
        >
          <div className="ModalContentContainer">
            <div className="ModalHeaderContainer">
              <img
                src={CloseImg}
                alt="close"
                className="CloseModal"
                onClick={() => this.setState({ isModalOpen: false })}
              />
              <h2 className="ModalTitle">Chose a song to replace</h2>
            </div>
            <div className="ModalSongsContainer">
              {
                this.props.my3.map(song => {
                  return (
                    <div
                      key={`${song.title}-${song.artist}-${song.item_index}`}
                      className="ModalSongContainer">
                      <div
                        className="ReplaceButton"
                        onClick={() => {
                          const newSong = this.state.selectedSong;

                          putMy3ForUser(this.props.userID, newSong.title, newSong.artist, newSong.img, song.item_index).then(() => {
                            this.props.replaceSongInMy3(song.item_index, this.state.selectedSong);
                            this.setState({ isModalOpen: false });
                            this.props.notify('Info', 'Song replaced in My3');
                          }).catch(err => {
                            console.log(err);
                            this.props.notify('Error', 'Error replacing song in My3');
                            this.setState({ isModalOpen: false });
                          })
                        }
                        }>REPLACE</div>
                      {song.title}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </Modal>
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >Songs</h1>
        {
          this.props.spotifySearchIsLoading ?
            <Loader
              loading={this.props.loading}
            /> :
            <div className="SearchResultsContainer">
              {this.renderResults()}
            </div>
        }
      </div>
    )
  }
}

export default SearchResults;
