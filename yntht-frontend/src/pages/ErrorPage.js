import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { ERROR_PAGES } from '../utilities/constants';
import { setBackgroundColor } from '../utilities/helpers';

import './ErrorPage.css';

const ErrorPage = ({ type }) => {
  const history = useHistory();

  const bgColor = '#24316E';
  setBackgroundColor(bgColor);

  return (
    <div className="ErrorPage">
      <h1 className="ErrorPageTitle">
        {ERROR_PAGES[type].title}
      </h1>
      <h3 className="ErrorPageSubtitle">
        {ERROR_PAGES[type].subtitle}
      </h3>
      <h3 className="ErrorPageText">
        {ERROR_PAGES[type].text}
      </h3>
      <div
        className="GoToHomepageButton"
        onClick={() => { history.push('/'); window.location.reload(); }}
      >
        GO TO HOMEPAGE
      </div>
    </div>
  );
};

export default withRouter(ErrorPage);
