import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../helpers/hooks';

import PLAYER_STYLE_MAP from './const';

const GameInfoPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const players = useAppSelector((state) => state.gameData.players);
  const currentPlayerIndex = useAppSelector(
    (state) => state.gameData.currentPlayerIndex,
  );

  const { color } = PLAYER_STYLE_MAP[currentPlayerIndex];

  return (
    <h2>
      {t('game.playerTurn')}{' '}
      <span className={`text-${color}`}>{players[currentPlayerIndex]}</span>
    </h2>
  );
};

export default GameInfoPanel;
