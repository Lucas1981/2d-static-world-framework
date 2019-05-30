import Actor from '../lib/Actor';
import IThreat from '../lib/IThreat';
import IVulnerable from '../lib/IVulnerable';
import Movable from '../resources/Movable';
import Immovable from '../resources/Immovable';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import EnemyProgress from './EnemyProgress';
import PlayerProgress from './PlayerProgress';

class EnemyThreat implements IThreat {
  public isHarmful(actor: Actor): Boolean {
    return actor.state.tags.includes('harmful');
  }
}

class PlayerVulnerable implements IVulnerable {
  public isVulnerable(actor: Actor): Boolean {
    return actor.state.tags.includes('vulnerable');
  }
}

export default {
  'player': {
    progress: PlayerProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: PlayerVulnerable,
    actionable: Active
  },
  'enemy': {
    progress: EnemyProgress,
    movable: Immovable,
    threat: EnemyThreat,
    volition: Malevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
}
