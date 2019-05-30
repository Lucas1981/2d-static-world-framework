import Movable from '../resources/Movable';
import Immovable from '../resources/Immovable';
import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import NoProgress from '../resources/NoProgress';
import BasicPlayerProgress from '../resources/BasicPlayerProgress';

const pixelsPerSecond = 200;

class PlayerProgress extends BasicPlayerProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'player': {
    progress: PlayerProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'box': {
    progress: NoProgress,
    movable: Movable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
}
