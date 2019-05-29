import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import PlayerMover from './PlayerMover';
import Enemy1Mover from './Enemy1Mover';
import Enemy2Mover from './Enemy2Mover';

export default {
  'player': {
    mover: PlayerMover,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'enemy1': {
    mover: Enemy1Mover,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'enemy2': {
    mover: Enemy2Mover,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
}
