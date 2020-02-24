import React from 'react';
import Plus from '../images/plus.png';
import '../global.css';
import './SongView.css';

const SongView = ({
  size, onClick, img, title, artist,
}) => (
  <div
    className={`SongContainer SongContainer-${size}`}
    onClick={onClick}
  >
    <div className={`SongImgContainer SongImgContainer-${size}`}>
      <img className={`SongImg SongImg-${size}`} src={img} alt={title} />
    </div>
    <div className={`SongDetailsContainer SongDetailsContainer-${size}`}>
      <p className={`SongDetailsTitle SongDetailsTitle-${size} OneLine`}>
        {title}
      </p>
        <p className={`SongDetailsArtist SongDetailsArtist-${size} TwoLines`}>
        {artist}
      </p>
    </div>
  </div>
);

export default SongView;
