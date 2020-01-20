import React from 'react';
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

  renderResults() {
    if (!this.props.spotifySearchResults) return <p>Other Error</p>;

    return (
      this.props.spotifySearchResults.tracks.items.map(track => {
        return (
          <p key={track.id}>{track.name}</p>
        )
      })
    )
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="SearchResults">
        <h1
          className="PageTitle"
          style={{ color: this.props.highlightColor }}
        >Search Results</h1>
        {
          this.props.spotifySearchIsLoading ? <p>Loading...</p> :
            this.props.spotifySearchIsInError ? <p>Error</p> :
              this.renderResults()
        }
      </div>
    )
  }
}

export default SearchResults;
