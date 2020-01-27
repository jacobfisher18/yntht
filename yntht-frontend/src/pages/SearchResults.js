import React from 'react';
import SongView from '../components/SongView.js';
import '../global.css';
import './SearchResults.css';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
    if (!this.props.spotifySearchResults) return <p>Other Error</p>;

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
