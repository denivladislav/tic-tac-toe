import GameOverModal from './GameOverModal';
import LeaveGameModal from './LeaveGameModal';
import { EModalTypes } from '../../helpers/enums';
import { TActiveModalType } from '../../helpers/types';

type TModals = {
  [key in TActiveModalType]: () => JSX.Element;
};

const modals: TModals = {
  [EModalTypes.GAME_OVER]: GameOverModal,
  [EModalTypes.LEAVE_GAME]: LeaveGameModal,
};

export default (modalType: TActiveModalType) => modals[modalType];
