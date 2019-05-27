import Active from '../resources/Active';
import Passive from '../resources/Passive';
import Benevolent from '../resources/Benevolent';
import Malevolent from '../resources/Malevolent';
import BasicMover from '../resources/BasicMover';
import { ItemActive, ItemHurtable, ItemMover } from './Item';
import { PlayerActive, PlayerHurtable, PlayerMover } from './Player';

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
    hurtable: PlayerHurtable,
    active: PlayerActive
  },
  'coin': {
    mover: ItemMover,
    hurtable: ItemHurtable,
    active: ItemActive
  },
  'enemy': {
    mover: EnemyMover,
    hurtable: Malevolent,
    active: Active
  },
};
