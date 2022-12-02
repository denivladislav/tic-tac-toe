import React from 'react';
import { openModal } from '../../slices/modalSlice';
import { EModalTypes } from '../../helpers/enums';
import { useAppDispatch } from '../../helpers/hooks';

import close from '../../assets/images/close.png';

const LeaveGameButton = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleCloseClick = (): void => {
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
