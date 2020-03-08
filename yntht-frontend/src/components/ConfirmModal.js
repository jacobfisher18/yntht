import React from 'react';
import Modal from 'react-modal';
import exitImg from '../images/close_grey.png';
import './ConfirmModal.css';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    boxSizing: 'border-box',
    boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.1)',
    display: 'flex',
    border: '1px',
  },
};

const ConfirmModal = ({
  title, subtitle, actionText, isModalOpen, error, confirmAction, closeAction,
}) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeAction}
    style={modalStyles}
    overlayClassName="ConfirmModalOverlay"
    ariaHideApp={false}
    shouldCloseOnOverlayClick={true}
  >
    <div className="ConfirmModalContentContainer">
      <div className="ConfirmModalHeaderContainer">
        <img
          src={exitImg}
          alt="close"
          className="ConfirmModalClose"
          onClick={closeAction}
        />
        <h2 className="ConfirmModalTitle">{title}</h2>
      </div>
      <h2 className="ConfirmModalSubtitle">{subtitle}</h2>
      {error && <p className="ConfirmModalError">{error}</p>}
      <div className="ConfirmModalButtonsContainer">
        <div
          className="ConfirmModalButton ConfirmModalCancelButton"
          onClick={closeAction}
        >
          Cancel
        </div>
        <div
          className="ConfirmModalButton ConfirmModalActionButton"
          onClick={confirmAction}
        >
          {actionText}
        </div>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
