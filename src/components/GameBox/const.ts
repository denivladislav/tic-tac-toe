import cross from '../../assets/images/cross.png';
import circle from '../../assets/images/circle.png';

type IPlayerStyleMap = {
  [key in number]: { img: string; alt: string; color: string };
};

const PLAYER_STYLE_MAP: IPlayerStyleMap = {
  0: { img: cross, alt: 'cross', color: 'red' },
  1: { img: circle, alt: 'circle', color: 'blue' },
};

export default PLAYER_STYLE_MAP;
