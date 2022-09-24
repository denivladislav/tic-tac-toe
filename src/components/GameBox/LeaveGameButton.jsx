import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slices/modalSlice';

import close from '../../assets/images/close.png';

const LeaveGameButton = () => {
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(openModal('leaveGame'));
  };

  return (
    <button type="button" className="closeButton" aria-label="close game" onClick={handleCloseClick} data-testid="closeButton">
      <img src={close} alt="close" />
    </button>
  );
};

export default LeaveGameButton;
