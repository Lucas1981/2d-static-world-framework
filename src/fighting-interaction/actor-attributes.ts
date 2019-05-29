import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import Unmovable from '../resources/Unmovable';
import EnemyMover from './EnemyMover';
import PlayerMover from './PlayerMover';

export default {
  'player': {
    mover: PlayerMover,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'enemy': {
    mover: EnemyMover,
    threat: Harmless,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
}
