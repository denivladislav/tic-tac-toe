import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal, Col, Row, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice';
import { restartGame, leaveGame } from '../../slices/gameDataSlice';
import { setGameState } from '../../slices/gameStateSlice';

const GameOverModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const players = useSelector((state) => state.gameData.players);
  const { result, playerIndex } = useSelector((state) => state.gameData.gameResult);

  const handleClickRestart = () => {
    dispatch(restartGame());
    dispatch(closeModal());
  };

  const handleClickLeave = () => {
    dispatch(leaveGame());
    dispatch(setGameState('login'));
    dispatch(closeModal());
  };

  const renderHeader = () => {
    const message = result === 'win'
      ? (
        <>
          {t('game.win', { player: players[playerIndex] })}
        </>
      )
      : (<>{t('game.draw')}</>);

    return (
      <Modal.Title>
        <Row className="justify-content-center">{t('game.gameOver')}</Row>
        <Row className="justify-content-center">
          {message}
        </Row>
      </Modal.Title>
    );
  };

  const renderBody = () => (
    <Col className="text-center">
      <Button className="mx-2" variant="danger" onClick={handleClickLeave}>
        {t('game.leave')}
      </Button>
      <Button className="mx-2" variant="primary" onClick={handleClickRestart}>
        {t('game.restart')}
      </Button>
    </Col>
  );

  return (
    <Modal centered show>
      <Modal.Header className="justify-content-center">
        {renderHeader()}
      </Modal.Header>
      <Modal.Body>
        {renderBody()}
      </Modal.Body>
    </Modal>
  );
};

export default GameOverModal;
