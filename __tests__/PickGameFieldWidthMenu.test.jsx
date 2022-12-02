import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import 'react-i18next';
import renderWithProviders from '../__tests-utils__/test-utils.jsx';
import PickGameFieldWidthMenu from '../src/components/PickGameFieldWidthMenu.tsx';

describe('pickGameFieldWidth', () => {
  test('pick width', async () => {
    renderWithProviders(<PickGameFieldWidthMenu />);

    const pickGameFieldWidth3 = await screen.findByTestId('gameFieldWidth-3');
    const pickGameFieldWidth4 = await screen.findByTestId('gameFieldWidth-4');
    const pickGameFieldWidth5 = await screen.findByTestId('gameFieldWidth-5');

    fireEvent.click(pickGameFieldWidth3);

    await waitFor(() => expect(pickGameFieldWidth3).toBeDisabled());
    expect(pickGameFieldWidth4).toBeDisabled();
    expect(pickGameFieldWidth5).toBeDisabled();
  });
});
