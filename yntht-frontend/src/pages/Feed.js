import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Loader from '../components/Loader';
import { setActiveTabAction } from '../redux/actionCreators';
import '../global.css';
import './Feed.css';

class Feed extends React.Component { // eslint-disable-line
  render() {
    const {
      data, history, setActiveTab, loading,
    } = this.props;

    return (
      <div className="Feed">
        <h1
          className="PageTitle"
        >
          Feed
        </h1>
        {
          loading ? <Loader loading />
            : data.length
              ? data.map((item) => (
                <div className="FeedItemContainer" key={item.id}>
                  <Avatar username={item.username} />
                  <span
                    className="FeedItemUsername"
                    onClick={() => { setActiveTab(''); history.push(`/user/${item.user_id}`); }}
                  >
                    {item.username}
                  </span>
                  <span className="FeedItemNormalText">&nbsp;added&nbsp;</span>
                  <span className="FeedItemTitle">{item.title}</span>
                  <span className="FeedItemNormalText">&nbsp;by&nbsp;</span>
                  <span className="FeedItemArtist">{item.artist}</span>
                  <span className="FeedItemNormalText">&nbsp;to Their 3&nbsp;</span>
                  <img className="FeedItemImg" src={item.img} alt="Album Cover" />
                </div>
              ))
              : <div>Your Feed is empty. Try following some people or adding to Your 3.</div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = { setActiveTab: setActiveTabAction };

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Feed);
