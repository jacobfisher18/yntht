import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { PAGES } from '../utilities/constants';
import { setActiveTabAction } from '../redux/actionCreators';
import { isLoggedIn } from '../utilities/helpers';
import Search from './Search';
import './Header.css';

class Header extends React.Component { // eslint-disable-line
  render() {
    const {
      activeTab,
      setActiveTab,
      handleSearchSubmit,
      history,
      location,
    } = this.props;

    const loggedIn = isLoggedIn();

    return loggedIn ? (
      <div className="HeaderContainer HeaderContainerLoggedIn">
        {
          location.pathname === '/' ?
            <Search
              onSubmit={(searchTerm) => handleSearchSubmit(searchTerm)}
            /> :
            <div className="spacer"/>
        }
        <div className="HeaderNavMenu HeaderNavMenuLoggedIn">
          {Object.keys(PAGES).filter((key) => PAGES[key].presentInMenu).map((key) => (
            <div
              key={key}
              className={activeTab === PAGES[key].name ? 'Black' : ''}
              onClick={() => { setActiveTab(PAGES[key].name); history.push('/'); }}
            >
              {PAGES[key].name}
            </div>
          ))}
        </div>
      </div>
    ) : (
        <div className="HeaderContainer HeaderContainerLoggedOut">
          <div
            className="HeaderHomeButton"
            onClick={() => { history.push('/'); }}
          >
            YNTHT
          </div>
          <div className="HeaderNavMenu HeaderNavMenuLoggedOut">
            <div
              onClick={() => { history.push('/login'); }}
            >
              Log In
              </div>
            <div
              onClick={() => { history.push('/signup'); }}
            >
              Sign Up
              </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab,
});

const mapDispatchToProps = { setActiveTab: setActiveTabAction };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
