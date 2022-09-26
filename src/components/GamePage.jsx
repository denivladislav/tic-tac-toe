import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';
import GameBox from './GameBox/GameBox.jsx';
import PickGameFieldWidth from './PickGameFieldWidth.jsx';
import SwitchLanguageButtons from './buttons/SwitchLangageButton.jsx';

const GamePage = () => {
  const gameState = useSelector((state) => state.gameState.gameState);

  const renderContent = () => {
    switch (gameState) {
      case 'login':
        return <LoginForm />;
      case 'pickGameFieldWidth':
        return <PickGameFieldWidth />;
      case 'gameRunning':
        return <GameBox />;
      default:
        throw new Error(`Unknown gameState: ${gameState}`);
    }
  };

  return (
    <Container className="h-100 game-page-container d-flex flex-column justify-content-center align-items-center">
      <SwitchLanguageButtons />
      {renderContent(gameState)}
    </Container>
  );
};

export default GamePage;
