import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setGameState, addPlayer } from '../slices/gameDataSlice';
import { MAX_NUMBER_OF_PLAYERS } from '../const';

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const players = useSelector((state) => state.gameData.players);
  const currentPlayerIndex = players.length + 1;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (players.length === MAX_NUMBER_OF_PLAYERS) {
      dispatch(setGameState('game'));
    }
  }, [players]);

  const loginSchema = Yup.object().shape({
    username: Yup.mixed()
      .required('required')
      .notOneOf(players, 'duplicatedUsername'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: loginSchema,
    onSubmit: (({ username }) => {
      dispatch(addPlayer(username));
      formik.resetForm();
      inputRef.current.focus();
    }),
  });

  const isUsernameValid = !(formik.touched.username && formik.errors.username);

  return (
    <Form onSubmit={formik.handleSubmit} className="d-flex flex-column align-items-center">
      <Form.Group className="d-flex flex-column align-items-center">
        <Form.Label htmlFor="username">{t('login.enterUsername', { currentPlayerIndex })}</Form.Label>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('login.username', { currentPlayerIndex })}
          name="username"
          id="username"
          autoComplete="Player"
          ref={inputRef}
          isInvalid={!isUsernameValid}
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
        >
          {t('login.submit')}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
