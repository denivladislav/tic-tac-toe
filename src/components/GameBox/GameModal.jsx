import React from 'react';
import { useSelector } from 'react-redux';
import { EModalTypes } from '../../helpers/enums.ts';
import getModal from '../modals/index.js';

const GameModal = () => {
  const modalType = useSelector((state) => state.modalInfo.modalType);

  if (modalType === EModalTypes.NULL) {
    return null;
  }

  const Modal = getModal(modalType);

  return <Modal />;
};

export default GameModal;
