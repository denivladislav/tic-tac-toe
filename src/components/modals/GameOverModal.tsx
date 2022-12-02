import React from 'react';
import { Modal, Col, Row, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice';
import { restartGame, leaveGame } from '../../slices/gameDataSlice';
import { setGameState } from '../../slices/gameStateSlice';
import { EGameStates, EGameResults } from '../../helpers/enums';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';

const GameOverModal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const players = useAppSelector((state) => state.gameData.players);
  const { result, playerIndex } = useAppSelector(
    (state) => state.gameData.gameResult,
  );

  const handleClickRestart = (): void => {
    dispatch(restartGame());
    dispatch(closeModal());
  };

  const handleClickLeave = (): void => {
    dispatch(leaveGame());
    dispatch(setGameState(EGameStates.LOGIN));
    dispatch(closeModal());
  };

  const renderHeader = (): JSX.Element => {
    const message =
      result === EGameResults.WIN ? (
        <>{t('game.win', { player: players[playerIndex] })}</>
      ) : (
        <>{t('game.draw')}</>
      );

    return (
      <Modal.Title>
        <Row className="justify-content-center">{t('game.gameOver')}</Row>
        <Row className="justify-content-center">{message}</Row>
      </Modal.Title>
    );
  };

  const renderBody = (): JSX.Element => (
    <Col className="text-center">
      <Button
        className="mx-2"
        variant="danger"
        onClick={handleClickLeave}
        aria-label="leave game"
      >
        {t('game.leave')}
      </Button>
      <Button
        className="mx-2"
        variant="primary"
        onClick={handleClickRestart}
        aria-label="restart game"
      >
        {t('game.restart')}
      </Button>
    </Col>
  );

  return (
    <Modal centered show>
      <Modal.Header className="justify-content-center">
        {renderHeader()}
      </Modal.Header>
      <Modal.Body>{renderBody()}</Modal.Body>
    </Modal>
  );
};

export default GameOverModal;
