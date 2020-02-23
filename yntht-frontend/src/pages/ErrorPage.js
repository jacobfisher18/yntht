import React from 'react';
import { withRouter } from 'react-router-dom';
import { ERROR_PAGES } from '../utilities/constants.js';
import './ErrorPage.css';

class ErrorPage extends React.Component {
  setBackgroundColor() {
    const bgColor = '#24316E';
    document.body.style.backgroundColor = bgColor;
  }

  render() {
    this.setBackgroundColor();

    return (
      <div className="ErrorPage">
        <h1 className="ErrorPageTitle">
          {ERROR_PAGES[this.props.type].title}
        </h1>
        <h3 className="ErrorPageSubtitle">
          {ERROR_PAGES[this.props.type].subtitle}
        </h3>
        <h3 className="ErrorPageText">
          {ERROR_PAGES[this.props.type].text}
        </h3>
        <div
          className="GoToHomepageButton"
          onClick={() => { this.props.history.push('/'); window.location.reload(); }}
        >
          GO TO HOMEPAGE
        </div>
      </div>
    );
  }
}

export default withRouter(ErrorPage);
