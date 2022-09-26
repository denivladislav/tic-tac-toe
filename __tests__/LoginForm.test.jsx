import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import i18n from 'i18next';
import { waitFor, screen, fireEvent } from '@testing-library/react';
import 'react-i18next';
import LoginForm from '../src/components/LoginForm.jsx';
import renderWithProviders from '../__tests-utils__/test-utils.jsx';
import { initialState } from '../src/slices/gameDataSlice.js';

const NORMAL_USERNAME = '12345';
const TOO_SHORT_USERNAME = '12';
const TOO_LONG_USERNAME = '123456789101112';

describe('login', () => {
  test('successful player login', async () => {
    renderWithProviders(<LoginForm />);

    const usernameInputPlayer1 = await screen.findByTestId(
      'usernameInputPlayer1',
    );
    fireEvent.change(usernameInputPlayer1, {
      target: { value: NORMAL_USERNAME },
    });
    expect(usernameInputPlayer1.value).toBe(NORMAL_USERNAME);

    const submitUsername = await screen.findByTestId('submitUsername');
    fireEvent.click(submitUsername);

    await waitFor(() => expect(submitUsername).toBeDisabled());

    const usernameInputPlayer2 = await screen.findByTestId(
      'usernameInputPlayer2',
    );
    await waitFor(() => expect(usernameInputPlayer2.value).toBe(''));
  });

  test('input errors', async () => {
    const { unmount } = renderWithProviders(<LoginForm />);
    // test required error
    const usernameInputPlayer1 = await screen.findByTestId(
      'usernameInputPlayer1',
    );

    const submitUsername = await screen.findByTestId('submitUsername');
    fireEvent.click(submitUsername);

    const requiredUsernameError = await screen.findByText(
      i18n.t('errors.required'),
    );
    expect(requiredUsernameError).toBeInTheDocument();

    // test tooShortUsername error
    fireEvent.change(usernameInputPlayer1, {
      target: { value: TOO_SHORT_USERNAME },
    });
    expect(usernameInputPlayer1.value).toBe(TOO_SHORT_USERNAME);

    fireEvent.click(submitUsername);

    const tooShortUsernameError = await screen.findByText(
      i18n.t('errors.tooShortUsername'),
    );
    expect(tooShortUsernameError).toBeInTheDocument();

    // test tooLongUsername error
    fireEvent.change(usernameInputPlayer1, {
      target: { value: TOO_LONG_USERNAME },
    });
    expect(usernameInputPlayer1.value).toBe(TOO_LONG_USERNAME);

    fireEvent.click(submitUsername);

    const tooLongUsernameError = await screen.findByText(
      i18n.t('errors.tooLongUsername'),
    );
    expect(tooLongUsernameError).toBeInTheDocument();

    // test duplicatedUsername error
    unmount();
    renderWithProviders(<LoginForm />, {
      preloadedState: {
        gameData: { ...initialState, players: [NORMAL_USERNAME] },
      },
    });
    const usernameInputPlayer2 = await screen.findByTestId(
      'usernameInputPlayer2',
    );
    fireEvent.change(usernameInputPlayer2, {
      target: { value: NORMAL_USERNAME },
    });
    expect(usernameInputPlayer2.value).toBe(NORMAL_USERNAME);

    const submitUsername1 = await screen.findByTestId('submitUsername');
    fireEvent.click(submitUsername1);

    const duplicatedUsernameError = await screen.findByText(
      i18n.t('errors.duplicatedUsername'),
    );
    expect(duplicatedUsernameError).toBeInTheDocument();
  });
});
