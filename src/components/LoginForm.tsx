import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addPlayer } from '../slices/gameDataSlice';
import { setGameState } from '../slices/gameStateSlice';
import { MAX_NUMBER_OF_PLAYERS } from '../const';
import { EGameStates } from '../helpers/enums';
import { useAppDispatch, useAppSelector } from '../helpers/hooks';

const LoginForm = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const players = useAppSelector((state) => state.gameData.players);
  const currentPlayer = players.length + 1;

  useEffect(() => {
    if (players.length === MAX_NUMBER_OF_PLAYERS) {
      dispatch(setGameState(EGameStates.PICK_GAMEFIELD_WIDTH));
    }
  }, [players]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required('required')
      .min(3, 'tooShortUsername')
      .max(12, 'tooLongUsername')
      .notOneOf(players, 'duplicatedUsername'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: loginSchema,
    onSubmit: ({ username }, { resetForm }) => {
      dispatch(addPlayer(username));
      resetForm();
      inputRef.current?.focus();
    },
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);

  return (
    <>
      <h1 className="mb-3">{t('general.gameName')}</h1>
      <Form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column align-items-center"
        data-testid="loginForm"
        aria-label="login form"
      >
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label htmlFor="username">
            {t('login.enterUsername', { currentPlayer })}
          </Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder={t('login.username', { currentPlayer })}
            name="username"
            id="username"
            ref={inputRef}
            isInvalid={!isUsernameValid}
            data-testid={`usernameInputPlayer${currentPlayer}`}
            aria-label="enter username"
          />
          <Form.Control.Feedback
            className="text-center col"
            type="invalid"
            aria-label="input error"
          >
            {!isUsernameValid && t(`errors.${formik.errors.username}`)}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="mt-2"
          disabled={formik.isSubmitting}
          type="submit"
          variant="primary"
          data-testid="submitUsername"
          aria-label="submit username"
        >
          {t('login.submit')}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
