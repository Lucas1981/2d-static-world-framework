import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Unmovable from '../resources/Unmovable';
import BasicPlayerMover from '../resources/BasicPlayerMover';

const pixelsPerSecond = 200;

class PlayerMover extends BasicPlayerMover {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'player': {
    mover: PlayerMover,
    hurtable: Benevolent,
    active: Active
  },
  'box': {
    mover: Unmovable,
    hurtable: Benevolent,
    active: Passive
  },
}
