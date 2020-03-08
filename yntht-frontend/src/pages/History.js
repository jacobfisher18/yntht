import React from 'react';
import Loader from '../components/Loader';
import ConfirmModal from '../components/ConfirmModal';
import crossImg from '../images/close_grey.png';
import { deleteAction } from '../api/actionsClient';
import '../global.css';
import './History.css';

class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      deleteHistoryItemError: '',
      selectedItemID: 0,
    };

    this.deleteHistoryItem = this.deleteHistoryItem.bind(this);
  }

  deleteHistoryItem(itemID) {
    const { deleteItemFromHistory, fetchActions } = this.props;

    deleteAction(itemID).then((res) => {
      if (res.error) {
        this.setState({ deleteHistoryItemError: 'There was an error deleting this item.' });
        return;
      }

      this.setState({ isModalOpen: false });
      deleteItemFromHistory(itemID);
      fetchActions();
    }).catch(() => {
      this.setState({ deleteHistoryItemError: 'There was an error deleting this item.' });
    });
  }

  render() {
    const {
      data,
      loading,
    } = this.props;
    const {
      isModalOpen,
      deleteHistoryItemError,
      selectedItemID,
    } = this.state;

    return (
      <div className="History">
        <ConfirmModal
          title="Delete From History?"
          subtitle="This will remove this song from your history and your follower's feeds."
          actionText="Delete"
          isModalOpen={isModalOpen}
          error={deleteHistoryItemError}
          confirmAction={() => { this.deleteHistoryItem(selectedItemID) }}
          closeAction={() => { this.setState({ isModalOpen: false }); }}
        />
        <h1
          className="PageTitle"
        >
          History
        </h1>
        {
          loading ? <Loader loading={true}/> :
          data.length ?
            data.map(item => (
              <div className="HistoryItemContainer" key={item.id}>
                <img
                  src={crossImg}
                  alt="Delete Item"
                  className="HistoryItemDelete"
                  onClick={() => { this.setState({ isModalOpen: true, selectedItemID: item.id }); }}
                />
                <span className="HistoryItemNormalText">You added&nbsp;</span>
                <span className="HistoryItemTitle">{item.title}</span>
                <span className="HistoryItemNormalText">&nbsp;by&nbsp;</span>
                <span className="HistoryItemArtist">{item.artist}</span>
                <span className="HistoryItemNormalText">&nbsp;to Your 3&nbsp;</span>
                <img className="HistoryItemImg" src={item.img} alt="Album Cover"/>
              </div>
            ))
            :
            <div>You haven't added any songs yet to Your 3.</div>
        }
      </div>
    );
  }
}

export default History;
