import Movable from '../resources/Movable';
import Immovable from '../resources/Immovable';
import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import EnemyProgress from './EnemyProgress';
import ItemProgress from './ItemProgress';
import PlayerProgress from './PlayerProgress';

export default {
  'player': {
    progress: PlayerProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'coin': {
    progress: ItemProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Passive
  },
  'baddy': {
    progress: EnemyProgress,
    movable: Immovable,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  },
  'thug': {
    progress: EnemyProgress,
    movable: Immovable,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  }
};
