import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next-tests.js';
import { setupStore } from '../src/slices/index.ts';
import { generateGameField } from '../src/utils/utils.ts';

export const getField = (moves, width = 3) => {
  const field = generateGameField(width);
  moves.forEach(({ coords, playerIndex }) => {
    const { row, col } = coords;
    field[row][col].occupiedByPlayer = playerIndex;
  });
  return field;
};

const renderWithProviders = (
  component,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) => {
  function Wrapper({ children }) {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>{children}</Provider>
      </I18nextProvider>
    );
  }

  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};

export default renderWithProviders;
