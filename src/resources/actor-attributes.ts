import Active from './Active';
import Passive from './Passive';
import Benevolent from './Benevolent';
import Malevolent from './Malevolent';
import UntilHit from './UntilHit';

const up = 0;
const upperRight = 1;
const right = 2;
const lowerRight = 3;
const down = 4;
const lowerLeft = 5
const left = 6;
const upperLeft = 7;

const fourtyFiveDegrees = 1;
const ninetyDegrees = 2;
const oneEightyDegrees = 4;
const twoSeventyDegrees = 6;

const clockwise = 1;
const counterClockwise = -1;

const allContingencies = {
  wallHugger: {
    conditions: {
      directions: [ 2 ],
      turn: ninetyDegrees,
      all: false
    },
    default: counterClockwise * ninetyDegrees
  },
  stageFright: {
    conditions: {
      directions: [ 1, -1 ],
      turn: oneEightyDegrees,
      all: true
    },
    default: counterClockwise * ninetyDegrees
  },
  ninetyDegreesCounterClockwise: {
    default: counterClockwise * ninetyDegrees
  },
  ninetyDegrees: {
    default: ninetyDegrees
  },
  oneEightyDegrees: {
    default: oneEightyDegrees
  }
}

function moveFactory(contingencies: any = allContingencies.ninetyDegrees, startingPosition = up) {
  return class extends UntilHit {
    constructor() {
        super(contingencies, startingPosition);
    };
  };
}

export default {
  'red': {
    mover: moveFactory(),
    hurtable: Benevolent,
    active: Active
  },
  'green': {
    mover: moveFactory(allContingencies.ninetyDegreesCounterClockwise, left),
    hurtable: Benevolent,
    active: Active
  },
  'blue': {
    mover: moveFactory(),
    hurtable: Benevolent,
    active: Active
  },
  'yellow': {
    mover: moveFactory(),
    hurtable: Benevolent,
    active: Active
  },

  'purple': {
    mover: moveFactory(allContingencies.oneEightyDegrees, left),
    hurtable: Benevolent,
    active: Active
  },
  'brown': {
    mover: moveFactory(allContingencies.wallHugger, right),
    hurtable: Benevolent,
    active: Active
  },
  'grey': {
    mover: moveFactory(allContingencies.oneEightyDegrees, right),
    hurtable: Benevolent,
    active: Active
  },
  'cyaan': {
    mover: moveFactory(allContingencies.oneEightyDegrees, up),
    hurtable: Benevolent,
    active: Active
  },

  'magenta': {
    mover: moveFactory(allContingencies.oneEightyDegrees, down),
    hurtable: Benevolent,
    active: Active
  },
  'black': {
    mover: moveFactory(allContingencies.ninetyDegreesCounterClockwise, right),
    hurtable: Benevolent,
    active: Active
  },
  'orange': {
    mover: moveFactory(),
    hurtable: Benevolent,
    active: Active
  },
  'pink': {
    mover: moveFactory(allContingencies.stageFright, left),
    hurtable: Benevolent,
    active: Active
  }
};
