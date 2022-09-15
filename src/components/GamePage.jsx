import React from 'react';
import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

const renderContent = () => {
  const gameStatus = useSelector((state) => state.gameData.gameStatus);
  switch (gameStatus) {
    case 'player1login':
      return (<h3>player1login</h3>);
    default:
      throw new Error(`Unknown gameStatus: ${gameStatus}`);
  }
};

const GamePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t('enterName')}</h3>
      {renderContent()}
    </div>
  );
};

export default GamePage;
