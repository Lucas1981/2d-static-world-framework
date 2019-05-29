import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import EnemyMover from './Enemy';
import ItemMover from './Item';
import PlayerMover from './Player';

export default {
  'player': {
    mover: PlayerMover,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'coin': {
    mover: ItemMover,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Passive
  },
  'baddy': {
    mover: EnemyMover,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  },
  'thug': {
    mover: EnemyMover,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  }
};
