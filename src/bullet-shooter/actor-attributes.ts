import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import Movable from '../resources/Movable';
import Immovable from '../resources/Immovable';
import PlayerProgress from './PlayerProgress';
import Enemy1Progress from './Enemy1Progress';
import Enemy2Progress from './Enemy2Progress';

export default {
  'player': {
    progress: PlayerProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'enemy1': {
    progress: Enemy1Progress,
    movable: Immovable,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'enemy2': {
    progress: Enemy2Progress,
    movable: Immovable,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
}
