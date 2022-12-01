import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './LoginForm.jsx';
import GameBox from './GameBox/GameBox.jsx';
import PickGameFieldWidthMenu from './PickGameFieldWidthMenu.jsx';
import SwitchLanguageButtons from './buttons/SwitchLangageButton.jsx';
import { EGameStates } from '../helpers/types';
import { useAppSelector } from '../helpers/hooks';

const GamePage = (): JSX.Element => {
  const gameState = useAppSelector((state) => state.gameState.gameState);

  const renderContent = () => {
    switch (gameState) {
      case EGameStates.LOGIN:
        return <LoginForm />;
      case EGameStates.PICK_GAMEFIELD_WIDTH:
        return <PickGameFieldWidthMenu />;
      case EGameStates.GAME_RUNNING:
        return <GameBox />;
      default:
        throw new Error(`Unknown gameState: ${gameState}`);
    }
  };

  return (
    <Container className="h-100 game-page-container d-flex flex-column justify-content-center align-items-center">
      <SwitchLanguageButtons />
      {renderContent()}
    </Container>
  );
};

export default GamePage;
