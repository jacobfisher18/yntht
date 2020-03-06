import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { PAGES } from '../utilities/constants';
import { setActiveTabAction } from '../redux/actionCreators';
import Search from './Search';
import './Header.css';

// TODO: different behavior if user isn't logged in
class Header extends React.Component { // eslint-disable-line
  render() {
    const {
      activeTab,
      setActiveTab,
      handleSearchSubmit,
      history,
      location,
    } = this.props;

    const onRootPath = location.pathname === '/';

    return (
      <div className="HeaderContainer">
        <Search
          onSubmit={(searchTerm) => handleSearchSubmit(searchTerm)}
        />
        <div className="HeaderNavMenu">
          {
            Object.keys(PAGES).filter((key) => PAGES[key].presentInMenu).map((key) => (
              <div
                key={key}
                className={activeTab === PAGES[key].name && onRootPath ? 'Black' : ''}
                onClick={() => {
                  setActiveTab(PAGES[key].name);
                  if (!onRootPath) {
                    history.push('/');
                  }
                }}
              >
                {PAGES[key].name}
              </div>
            ))
          }
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
