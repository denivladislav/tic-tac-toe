import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';
import GameBox from './GameBox/GameBox.jsx';

const GamePage = () => {
  const gameState = useSelector((state) => state.gameState.gameState);

  const renderContent = () => {
    switch (gameState) {
      case 'login':
        return <LoginForm />;
      case 'gameRunning':
        return <GameBox />;
      default:
        throw new Error(`Unknown gameState: ${gameState}`);
    }
  };

  return (
    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
      {renderContent(gameState)}
    </Container>
  );
};

export default GamePage;
