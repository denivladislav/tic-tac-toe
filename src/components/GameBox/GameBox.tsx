import React, { useEffect } from 'react';
import { getGameResult } from '../../utils/utils';
import { openModal } from '../../slices/modalSlice';
import { addResult } from '../../slices/gameDataSlice';
import GameInfoPanel from './GameInfoPanel';
import LeaveGameButton from '../buttons/LeaveGameButton';
import GameField from './GameField';
import GameModal from './GameModal';
import UndoLastMoveButton from '../buttons/UndoLastMoveButton';
import { EModalTypes, EGameResults } from '../../helpers/enums';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';

const GameBox = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const gameField = useAppSelector((state) => state.gameData.gameField);
  const moves = useAppSelector((state) => state.gameData.moves);

  useEffect(() => {
    const gameResult = getGameResult(moves, gameField);
    const { result } = gameResult;
    const hasGameEnded =
      result === EGameResults.WIN || result === EGameResults.DRAW;
    if (hasGameEnded) {
      dispatch(addResult(gameResult));
      dispatch(openModal(EModalTypes.GAME_OVER));
    }
  }, [moves]);

  return (
    <>
      <LeaveGameButton />
      <GameInfoPanel />
      <GameField />
      <UndoLastMoveButton />

      <GameModal />
    </>
  );
};

export default GameBox;
