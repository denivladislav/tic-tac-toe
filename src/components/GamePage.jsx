import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm.jsx';
import GameBox from './GameBox.jsx';

const renderContent = () => {
  const gameState = useSelector((state) => state.gameData.gameState);
  console.log('gameState', gameState);
  switch (gameState) {
    case 'login':
      return <LoginForm />;
    case 'game':
      return <GameBox />;
    default:
      throw new Error(`Unknown gameState: ${gameState}`);
  }
};

const GamePage = () => {
  const { t } = useTranslation();
  return (
    <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h3>{t('general.gameName')}</h3>
      {renderContent()}
    </Container>
  );
};

export default GamePage;
