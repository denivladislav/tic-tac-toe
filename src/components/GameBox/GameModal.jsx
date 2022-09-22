import React from 'react';
import { useSelector } from 'react-redux';
import getModal from '../modals/index.js';

const GameModal = () => {
  const modalType = useSelector((state) => state.modalInfo.modalType);

  if (!modalType) {
    return null;
  }

  const Modal = getModal(modalType);

  return (
    <Modal />
  );
};

export default GameModal;
