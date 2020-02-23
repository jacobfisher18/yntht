import React from 'react';
import SearchImg from '../images/search.png';
import '../global.css';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  handleSubmit(e) {
    if (this.state.searchTerm) {
      this.props.onSubmit(this.state.searchTerm);
    }

    if (e) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        <img
          src={SearchImg}
          alt="Search"
          onClick={this.handleSubmit}
        />
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder=" Search for a user, song, or artist..."
        />
      </form>
    );
  }
}

export default Search;
