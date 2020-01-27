import React from 'react';
import DrakeImg from '../images/img1.png';
import CaminoImg from '../images/img2.png';
import ChelseaImg from '../images/img3.png';
import SongView from '../components/SongView.js'
import '../global.css';
import './My3.css';

class My3 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      songs: [
        {
          title: "Life Is Good (feat. Drake)",
          artist: "Future, Drake",
          img: DrakeImg,
        },
        {
          title: "See Through",
          artist: "The Band Camino",
          img: CaminoImg,
        },
        {
          title: "Are You Listening",
          artist: "Chelsea Cutler",
          img: ChelseaImg,
        }
      ]
    }
  }

  renderSongs() {
    return this.state.songs.map(song => {
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
          My 3</h1>
        {this.renderSongs()}
      </div>
    )
  }
}

export default My3;
