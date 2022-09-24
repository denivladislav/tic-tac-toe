import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import PLAYER_STYLE_MAP from './const.js';

const GameInfoPanel = () => {
  const { t } = useTranslation();
  const players = useSelector((state) => state.gameData.players);
  const currentPlayerIndex = useSelector(
    (state) => state.gameData.currentPlayerIndex,
  );

  const { color } = PLAYER_STYLE_MAP[currentPlayerIndex];

  return (
    <h2>
      {t('game.playerTurn')}
      {' '}
      <span className={`text-${color}`}>{players[currentPlayerIndex]}</span>
    </h2>
  );
};

export default GameInfoPanel;
