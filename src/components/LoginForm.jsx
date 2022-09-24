import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addPlayer } from '../slices/gameDataSlice';
import { setGameState } from '../slices/gameStateSlice';
import { MAX_NUMBER_OF_PLAYERS } from '../const';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const players = useSelector((state) => state.gameData.players);
  const currentPlayer = players.length + 1;

  useEffect(() => {
    if (players.length === MAX_NUMBER_OF_PLAYERS) {
      dispatch(setGameState('gameRunning'));
    }
  }, [players]);

  useEffect(() => {
    inputRef.current.focus();
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
    onSubmit: (({ username }, { resetForm }) => {
      dispatch(addPlayer(username));
      resetForm();
      inputRef.current.focus();
    }),
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);

  return (
    <>
      <h1 className="mb-3">{t('general.gameName')}</h1>
      <Form onSubmit={formik.handleSubmit} className="d-flex flex-column align-items-center" data-testid="loginForm">
        <Form.Group className="d-flex flex-column align-items-center">
          <Form.Label htmlFor="username">{t('login.enterUsername', { currentPlayer })}</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder={t('login.username', { currentPlayer })}
            name="username"
            id="username"
            ref={inputRef}
            isInvalid={!isUsernameValid}
            data-testid={`usernameInputPlayer${currentPlayer}`}
          />
          <Form.Control.Feedback className="text-center col" type="invalid">
            {!isUsernameValid && t(`errors.${formik.errors.username}`)}
          </Form.Control.Feedback>
        </Form.Group>
        <div>
          <Button
            className="mt-2"
            disabled={formik.isSubmitting}
            type="submit"
            variant="primary"
            data-testid="submitUsername"
          >
            {t('login.submit')}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
