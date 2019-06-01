import BasicProgress from '../resources/BasicProgress';
import ItemProgress from './ItemProgress';
import PlayerProgress from './PlayerProgress';
import NoStateChange from '../resources/NoStateChange';

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
  constructor(data) {
    super({
      conditions: {
        directions: [ 2 ],
        turn: ninetyDegrees,
        all: false
      },
      default: counterClockwise * ninetyDegrees
    });
  }
}

export default {
  'player': {
    progress: [PlayerProgress],
    stateChanger: NoStateChange
  },
  'coin': {
    progress: [ItemProgress],
    stateChanger: NoStateChange
  },
  'enemy': {
    progress: [EnemyProgress],
    stateChanger: NoStateChange
  },
};
