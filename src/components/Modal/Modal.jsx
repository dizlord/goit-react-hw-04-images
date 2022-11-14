import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalImage, closeModal }) => {
  const closeModalRef = useRef(closeModal);

  useEffect(() => {
    const closeByESC = e => {
      if (e.code === 'Escape') {
        closeModalRef.current();
      }
    };
    window.addEventListener('keydown', closeByESC);

    return () => {
      window.removeEventListener('keydown', closeByESC);
    };
  }, []);

  return createPortal(
    <div
      className="Overlay"
      onClick={e => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
    >
      <div className="Modal">
        <img src={modalImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
