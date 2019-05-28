import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Unmovable from '../resources/Unmovable';
import PlayerMover from './PlayerMover';
import Enemy1Mover from './Enemy1Mover';
import Enemy2Mover from './Enemy2Mover';

export default {
  'player': {
    mover: PlayerMover,
    hurtable: Benevolent,
    active: Passive
  },
  'enemy1': {
    mover: Enemy1Mover,
    hurtable: Malevolent,
    active: Passive
  },
  'enemy2': {
    mover: Enemy2Mover,
    hurtable: Malevolent,
    active: Passive
  },
}
