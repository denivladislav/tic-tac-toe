import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';
import GameBox from './gameBox/GameBox.jsx';

const renderContent = () => {
  const gameState = useSelector((state) => state.gameData.gameState);
  console.log('gameState', gameState);
  switch (gameState) {
    case 'login':
      return <LoginForm />;
    case 'gameRunning':
      return <GameBox />;
    case 'gameOver':
      return <div>Game Over!</div>;
    default:
      throw new Error(`Unknown gameState: ${gameState}`);
  }
};

const GamePage = () => (
  <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
    {renderContent()}
  </Container>
);

export default GamePage;
