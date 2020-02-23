import React from 'react';
import InfoImg from '../images/info.png';
import SongView from '../components/SongView';
import Loader from '../components/Loader';
import { setBackgroundColor } from '../utilities/helpers';
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
    const { bgColor, highlightColor } = this.props;

    setBackgroundColor(bgColor);

    return (
      <div className="My3">
        <h1
          className="PageTitle"
          style={{ color: highlightColor }}
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
          this.props.loading
            ? (
              <Loader
                loading={this.props.loading}
              />
            )
            : this.renderSongs()
        }
      </div>
    );
  }
}

export default My3;
