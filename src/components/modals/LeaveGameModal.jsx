import React from 'react';
import { Modal, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
import { setGameState } from '../../slices/gameStateSlice.ts';
import { leaveGame } from '../../slices/gameDataSlice';
import { EGameStates } from '../../helpers/types.ts';

const LeaveGameModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleClickConfirm = () => {
    dispatch(leaveGame());
    dispatch(setGameState(EGameStates.LOGIN));
    dispatch(closeModal());
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  const renderHeader = () => (
    <Modal.Title>{t('game.confirmLeave')}</Modal.Title>
  );

  const renderBody = () => (
    <Col className="text-center">
      <Button
        className="mx-2"
        variant="danger"
        onClick={handleClickConfirm}
        aria-label="confirm leave game"
      >
        {t('game.confirm')}
      </Button>
      <Button
        className="mx-2"
        variant="primary"
        onClick={handleClickCancel}
        aria-label="cancel leave game"
      >
        {t('game.cancel')}
      </Button>
    </Col>
  );

  return (
    <Modal centered onHide={handleClickCancel} show>
      <Modal.Header className="justify-content-center">
        {renderHeader()}
      </Modal.Header>
      <Modal.Body>{renderBody()}</Modal.Body>
    </Modal>
  );
};

export default LeaveGameModal;
