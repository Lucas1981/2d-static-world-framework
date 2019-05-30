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
import BasicProgress from '../resources/BasicProgress';
import ItemProgress from './ItemProgress';
import PlayerProgress from './PlayerProgress';

const fourtyFiveDegrees = 1;
const ninetyDegrees = 2;
const oneEightyDegrees = 4;
const twoSeventyDegrees = 6;

const clockwise = 1;
const counterClockwise = -1;

const up = 0;
const upperRight = 1;
const right = 2;
const lowerRight = 3;
const down = 4;
const lowerLeft = 5
const left = 6;
const upperLeft = 7;

class EnemyProgress extends BasicProgress {
  constructor() {
    super({
      conditions: {
        directions: [ 2 ],
        turn: ninetyDegrees,
        all: false
      },
      default: counterClockwise * ninetyDegrees
    }, down);
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
  'coin': {
    progress: ItemProgress,
    movable: Immovable,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Passive
  },
  'enemy': {
    progress: EnemyProgress,
    movable: Immovable,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  },
};
