import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGameResult } from '../../utils/utils';
import { openModal } from '../../slices/modalSlice';
import { addResult } from '../../slices/gameDataSlice';
import GameInfoPanel from './GameInfoPanel.jsx';
import LeaveGameButton from '../buttons/LeaveGameButton.jsx';
import GameField from './GameField.jsx';
import GameModal from './GameModal.jsx';
import UndoLastMoveButton from '../buttons/UndoLastMoveButton.jsx';
import { EModalTypes, EGameResults } from '../../helpers/enums';

const GameBox = () => {
  const dispatch = useDispatch();
  const gameField = useSelector((state) => state.gameData.gameField);
  const moves = useSelector((state) => state.gameData.moves);

  useEffect(() => {
    const gameResult = getGameResult(moves, gameField);
    const { result } = gameResult;
    const hasGameEnded = result === EGameResults.WIN || result === EGameResults.DRAW;
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
