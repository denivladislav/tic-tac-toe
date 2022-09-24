import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import i18n from 'i18next';
import {
  screen, fireEvent,
} from '@testing-library/react';
import 'react-i18next';
import renderWithProviders, { getField } from '../__tests-utils__/test-utils.jsx';
import { initialState } from '../src/slices/gameDataSlice.js';
import GameBox from '../src/components/GameBox/GameBox.jsx';
import preWinMoves from '../__fixtures__/preWinMoves.json';
import preDrawMoves from '../__fixtures__/preDrawMoves.json';

const PLAYERS = ['player1', 'player2'];

describe('game', () => {
  const makeMove = async (cellId) => {
    const cell = await screen.findByTestId(cellId);
    fireEvent.click(cell);
  };

  test('win', async () => {
    renderWithProviders(
      <GameBox />,
      {
        preloadedState: {
          gameData: {
            ...initialState,
            players: PLAYERS,
            gameField: getField(preWinMoves.moves),
            moves: preWinMoves.moves,
          },
        },
      },
    );
    await screen.getByText(PLAYERS[0]);
    await makeMove('row0-col2');

    await screen.findByText(i18n.t('game.win', { player: PLAYERS[0] }));
  });

  test('draw', async () => {
    renderWithProviders(
      <GameBox />,
      {
        preloadedState: {
          gameData: {
            ...initialState,
            players: PLAYERS,
            gameField: getField(preDrawMoves.moves),
            moves: preDrawMoves.moves,
          },
        },
      },
    );
    await screen.getByText(PLAYERS[0]);
    await makeMove('row2-col0');

    await screen.findByText(i18n.t('game.draw'));
  });

  test('leaveGame', async () => {
    renderWithProviders(
      <GameBox />,
      {
        preloadedState: {
          gameData: {
            ...initialState,
            players: PLAYERS,
            gameField: getField(preWinMoves.moves),
            moves: preWinMoves.moves,
          },
        },
      },
    );

    const closeButton = await screen.getByTestId('closeButton');
    fireEvent.click(closeButton);

    const confirmLeave = await screen.findByText(i18n.t('game.confirmLeave'));
    expect(confirmLeave).toBeInTheDocument();
  });
});
