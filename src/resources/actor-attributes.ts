import Harmful from './Harmful';
import Harmless from './Harmless';
import Active from './Active';
import Passive from './Passive';
import Benevolent from './Benevolent';
import Malevolent from './Malevolent';
import Vulnerable from './Vulnerable';
import Invulnerable from './Invulnerable';
import BasicMover from './BasicMover';
import DiagonalMover from './DiagonalMover';
import CircularMover from './CircularMover';

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
  return class extends BasicMover {
    constructor() {
        super(contingencies, startingPosition);
    };
  };
}

function circularMoveFactory(
    horizontal: number = 1,
    vertical: number = 1,
    radius: number = 32,
    angle: number = 0,
    speed: number = 300,
    direction: number = 1
  ) {
  return class extends CircularMover {
    constructor() {
      super(horizontal, vertical, radius, angle, speed, direction);
    }
  }
}

export default {
  'red': {
    mover: moveFactory(),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'green': {
    mover: moveFactory(allContingencies.ninetyDegreesCounterClockwise, left),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'blue': {
    mover: moveFactory(),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'yellow': {
    mover: moveFactory(),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },

  'purple': {
    mover: moveFactory(allContingencies.oneEightyDegrees, left),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'brown': {
    mover: DiagonalMover,
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'grey': {
    mover: moveFactory(allContingencies.oneEightyDegrees, right),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'cyaan': {
    mover: moveFactory(allContingencies.oneEightyDegrees, up),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'magenta': {
    mover: moveFactory(allContingencies.oneEightyDegrees, down),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'black': {
    mover: moveFactory(allContingencies.ninetyDegreesCounterClockwise, right),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'orange': {
    mover: moveFactory(allContingencies.wallHugger, right),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'pink': {
    mover: moveFactory(allContingencies.stageFright, left),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },

  'teal': {
    mover: circularMoveFactory(1, 0),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'navy': {
    mover: circularMoveFactory(1, 1, 32, 0, 100),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  },
  'burlywood': {
    mover: circularMoveFactory(0, 1, 32, 0, 200, -1),
    threat: Harmless,
    volition: Benevolent,
    vulnerable: Vulnerable,
    actionable: Active
  }
};
