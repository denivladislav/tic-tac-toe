import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { undoLastMove } from '../../slices/gameDataSlice';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';

const UndoLastMoveButton = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const moves = useAppSelector((state) => state.gameData.moves);

  const isDisabled = moves.length === 0;

  const handleClick = (): void => {
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
