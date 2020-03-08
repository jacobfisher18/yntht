import React from 'react';
import InfoImg from '../images/info.png';
import SongView from '../components/SongView';
import Loader from '../components/Loader';
import '../global.css';
import './My3.css';

class My3 extends React.Component {
  renderSongs() {
    const { songs } = this.props;

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
    const { loading, songs } = this.props;

    const songsIsEmpty = songs.every((item) => !item.title && !item.artist && !item.img);

    return (
      <div className="My3">
        <h1
          className="PageTitle"
        >
          My 3
          <div className="Tooltip">
            <img
              className="InfoButton"
              src={InfoImg}
              alt="info"
            />
            <div className="TooltipTextContainer">
              <span className="TooltipText">Search for a song above to add it to Your 3</span>
            </div>
          </div>

        </h1>
        {
          loading ? (
            <Loader
              loading={loading}
            />
          ) : songsIsEmpty ? (
            <div className="My3IsEmptyText">Your 3 is empty. Try searching for a song and adding it to Your 3.</div>
          ) : this.renderSongs()
        }
      </div>
    );
  }
}

export default My3;
