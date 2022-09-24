import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGameResult } from '../../utils/utils';
import { openModal } from '../../slices/modalSlice';
import { addResult } from '../../slices/gameDataSlice';
import GameInfoPanel from './GameInfoPanel.jsx';
import LeaveGameButton from '../buttons/LeaveGameButton.jsx';
import GameField from './GameField.jsx';
import GameModal from './GameModal.jsx';

const GameBox = () => {
  const dispatch = useDispatch();
  const gameField = useSelector((state) => state.gameData.gameField);
  const moves = useSelector((state) => state.gameData.moves);

  useEffect(() => {
    const gameResult = getGameResult(moves, gameField);
    const { result } = gameResult;
    const hasGameEnded = result === 'win' || result === 'draw';
    if (hasGameEnded) {
      dispatch(addResult(gameResult));
      dispatch(openModal('gameOver'));
    }
  }, [moves]);

  return (
    <>
      <LeaveGameButton />
      <GameInfoPanel />
      <GameField />

      <GameModal />
    </>
  );
};

export default GameBox;
