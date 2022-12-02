import GameOverModal from './GameOverModal.jsx';
import LeaveGameModal from './LeaveGameModal.jsx';
import { EModalTypes } from '../../helpers/enums.ts';

const modals = {
  [EModalTypes.GAME_OVER]: GameOverModal,
  [EModalTypes.LEAVE_GAME]: LeaveGameModal,
};

export default (modalType) => modals[modalType];
