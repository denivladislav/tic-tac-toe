import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { setGameState } from '../../slices/gameDataSlice.js';
import { checkGameResult } from '../../utils/utils.js';
import GameHeader from './GameHeader.jsx';
import GameField from './GameField.jsx';

const GameBox = () => {
  const dispatch = useDispatch();
  const currentPlayerIndex = useSelector((state) => state.gameData.currentPlayerIndex);
  const gameField = useSelector((state) => state.gameData.gameField);
  const moves = useSelector((state) => state.gameData.moves);

  useEffect(() => {
    const hasGameEnded = checkGameResult(moves, gameField);
    if (hasGameEnded) {
      dispatch(setGameState('gameOver'));
    }
  }, [currentPlayerIndex]);

  return (
    <>
      <GameHeader />
      <Container className="game-field-container">
        <GameField />
      </Container>
    </>
  );
};

export default GameBox;
