import React from 'react';
import SongView from '../components/SongView.js';
import Modal from 'react-modal';
import CloseImg from '../images/close.png';
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
    const matchingItems = self.filter((obj) => obj.name === value.name && obj.artists[0].name === value.artists[0].name);

    return !(matchingItems.length >= 2 && matchingItems[0].id !== value.id);
  }

  renderResults() {
    // TO-DO: Reusable error component
    if (!this.props.spotifySearchResults ||
      !this.props.spotifySearchResults.tracks ||
      !this.props.spotifySearchResults.tracks.items
      ) return <p>Other Error</p>;

    // TO-DO: Message for 0 results
    return (
      this.props.spotifySearchResults.tracks.items.filter(this.onlyUnique).map(track => {
        return (
          <SongView
            key={track.id}
            size="S"
            title={track.name}
            artist={track.artists[0].name} // TO-DO: use all artists, do null checking; note impact on onlyUnique above
            img={track.album.images[0].url} // TO-DO: null checking
            onClick={() => this.setState({
              isModalOpen: true,
              selectedSong: {
                title: track.name,
                artist: track.artists[0].name,
                img: track.album.images[0].url,
              }
            })}
          />
        )
      })
    )
  }

  render() {
    this.setBackgroundColor();

    // TO-DO: Better Loading component
    return (
      <div className="SearchResults">
        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={() => {}}
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
                onClick={() => this.setState({isModalOpen: false})}
              />
              <h2 className="ModalTitle">Chose a song to replace</h2>
            </div>
            <div className="ModalSongsContainer">
              {
                this.props.my3.map(song => {
                  return (
                    <div
                      key={song.title}
                      className="ModalSongContainer">
                      <div
                        className="MinusButton"
                        onClick={() => {
                          // TO-DO: API operation to change song, and proceed on success; handle error
                          this.props.replaceSongInMy3(song, this.state.selectedSong);
                          this.setState({ isModalOpen: false });
                        }
                        } />
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
          this.props.spotifySearchIsLoading ? <p>Loading...</p> :
            this.props.spotifySearchIsInError ? <p>Error</p> :
              <div className="SearchResultsContainer">
                {this.renderResults()}
              </div>
        }
      </div>
    )
  }
}

export default SearchResults;
