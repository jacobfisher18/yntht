import React from 'react';
import Plus from '../images/plus.png';
import '../global.css';
import './SongView.css';

class SongView extends React.Component {

  render() {
    return (
      <div className={`SongContainer SongContainer-${this.props.size}`}>
        <div className={`SongImgContainer SongImgContainer-${this.props.size}`}>
          <img className={`SongImg SongImg-${this.props.size}`} src={this.props.img} alt={this.props.title} />
          <img className={`SongImgPlus SongImgPlus-${this.props.size}`} src={Plus} alt="Plus" />
        </div>
        <div className={`SongDetailsContainer SongDetailsContainer-${this.props.size}`}>
          <p className={`SongDetailsTitle SongDetailsTitle-${this.props.size}`}>
            {this.props.title}
          </p>
          <p className={`SongDetailsArtist SongDetailsArtist-${this.props.size}`}>
            {this.props.artist}
          </p>
        </div>
      </div>
    )
  }
}

export default SongView;
