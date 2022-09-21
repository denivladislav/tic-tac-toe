import GameOverModal from './GameOverModal.jsx';
import LeaveGameModal from './LeaveGameModal.jsx';

const modals = {
  gameOver: GameOverModal,
  leaveGame: LeaveGameModal,
};

export default (modalType) => modals[modalType];
