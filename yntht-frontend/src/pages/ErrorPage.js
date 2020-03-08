import React from 'react';
import { useHistory } from 'react-router-dom';
import { ERROR_PAGES } from '../utilities/constants';

import './ErrorPage.css';

const ErrorPage = ({ type }) => {
  const history = useHistory();

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

export default ErrorPage;
