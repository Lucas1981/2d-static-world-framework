import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Unmovable from '../resources/Unmovable';
import PlayerMover from '../resources/PlayerMover';

const pixelsPerSecond = 200;

class ThisPlayerMover extends PlayerMover {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'player': {
    mover: ThisPlayerMover,
    hurtable: Benevolent,
    active: Active
  },
  'box': {
    mover: Unmovable,
    hurtable: Benevolent,
    active: Passive
  },
}
