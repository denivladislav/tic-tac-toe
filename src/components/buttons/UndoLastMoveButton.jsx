import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { undoLastMove } from '../../slices/gameDataSlice.js';

const UndoLastMoveButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(undoLastMove());
  };

  return (
    <Button
      className="m-2"
      variant="secondary"
      onClick={handleClick}
      aria-label="undo last turn"
      data-testid="undoLastTurnButton"
    >
      {t('game.undoLastTurn')}
    </Button>
  );
};

export default UndoLastMoveButton;
