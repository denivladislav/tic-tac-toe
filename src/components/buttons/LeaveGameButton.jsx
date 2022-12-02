import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slices/modalSlice';

import close from '../../assets/images/close.png';
import { EModalTypes } from '../../helpers/enums';

const LeaveGameButton = () => {
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(openModal(EModalTypes.LEAVE_GAME));
  };

  return (
    <button
      type="button"
      className="closeButton"
      onClick={handleCloseClick}
      data-testid="closeButton"
      aria-label="close game"
    >
      <img src={close} alt="close" />
    </button>
  );
};

export default LeaveGameButton;
