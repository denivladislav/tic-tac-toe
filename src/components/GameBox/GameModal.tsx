import React from 'react';
import { EModalTypes } from '../../helpers/enums';
import { useAppSelector } from '../../helpers/hooks';
import getModal from '../modals/index';

const GameModal = (): JSX.Element | null => {
  const modalType = useAppSelector((state) => state.modalInfo.modalType);

  if (modalType === EModalTypes.NULL) {
    return null;
  }

  const Modal = getModal(modalType);

  return <Modal />;
};

export default GameModal;
