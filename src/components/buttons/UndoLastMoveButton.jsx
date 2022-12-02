import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { undoLastMove } from '../../slices/gameDataSlice';

const UndoLastMoveButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const moves = useSelector((state) => state.gameData.moves);

  const isDisabled = moves.length === 0;

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
      disabled={isDisabled}
    >
      {t('game.undoLastTurn')}
    </Button>
  );
};

export default UndoLastMoveButton;
