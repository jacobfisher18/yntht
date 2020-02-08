import React from 'react';
import InfoImg from '../images/info.png';
import SongView from '../components/SongView.js'
import '../global.css';
import './My3.css';

class My3 extends React.Component {

  renderSongs() {
    return this.props.songs
      .filter(song => song.title && song.artist && song.img)
      .map(song => {
      return (
        <SongView
          key={`${song.title}-${song.artist}`}
          size="M"
          title={song.title}
          artist={song.artist}
          img={song.img}
        />
      )
    })
  }

  setBackgroundColor() {
    document.body.style.backgroundColor = this.props.bgColor;
  }
  render() {
    this.setBackgroundColor();

    return (
      <div className="My3">
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
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
        
        {this.renderSongs()}
      </div>
    )
  }
}

export default My3;
