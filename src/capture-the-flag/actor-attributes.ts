import Harmful from '../resources/Harmful';
import Harmless from '../resources/Harmless';
import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import Vulnerable from '../resources/Vulnerable';
import Invulnerable from '../resources/Invulnerable';
import BasicMover from '../resources/BasicMover';
import ItemMover from './Item';
import PlayerMover from './Player';

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

class EnemyMover extends BasicMover {
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
  'enemy': {
    mover: EnemyMover,
    threat: Harmful,
    volition: Malevolent,
    vulnerable: Invulnerable,
    actionable: Active
  },
};
