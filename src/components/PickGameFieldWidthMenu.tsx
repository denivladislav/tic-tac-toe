import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container } from 'react-bootstrap';
import { setGameState } from '../slices/gameStateSlice';
import { pickGameFieldWidth } from '../slices/gameDataSlice';
import { AVAILABLE_GAME_FIELD_WIDTHS } from '../const';
import { EGameStates } from '../helpers/enums';
import { useAppDispatch } from '../helpers/hooks';

const BUTTON_PREFIX = 'gameFieldWidth';

const getWidth = (id: string) => Number(id.split('-')[1]);

const PickGameFieldWidthMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    setSubmitting(true);
    const width = getWidth((e.target as HTMLInputElement).id);
    dispatch(pickGameFieldWidth(width));
    dispatch(setGameState(EGameStates.GAME_RUNNING));
  };

  return (
    <>
      <h1 className="mb-3">{t('pickGameFieldWidth.pickGameFieldSize')}</h1>
      <Container
        className="d-flex justify-content-center"
        aria-label="pick game field width"
      >
        {AVAILABLE_GAME_FIELD_WIDTHS.map((width) => {
          const id = `${BUTTON_PREFIX}-${width}`;
          return (
            <Button
              size="lg"
              key={id}
              id={id}
              disabled={isSubmitting}
              className="mx-2"
              type="submit"
              data-testid={id}
              aria-label={`pick game field with width ${width}`}
              onClick={handleClick}
            >
              {t('pickGameFieldWidth.size', { width })}
            </Button>
          );
        })}
      </Container>
    </>
  );
};

export default PickGameFieldWidthMenu;
