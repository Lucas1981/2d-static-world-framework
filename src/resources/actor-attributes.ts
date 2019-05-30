import Movable from './Movable';
import Immovable from './Immovable';
import Harmful from './Harmful';
import Harmless from './Harmless';
import Active from './Active';
import Passive from './Passive';
import Benevolent from './Benevolent';
import Malevolent from './Malevolent';
import Vulnerable from './Vulnerable';
import Invulnerable from './Invulnerable';
import BasicProgress from './BasicProgress';
import DiagonalProgress from './DiagonalProgress';
import CircularProgress from './CircularProgress';

const defaultAttributes = {
  movable: Immovable,
  threat: Harmless,
  volition: Benevolent,
  vulnerable: Vulnerable,
  actionable: Active
};

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

function progressFactory(contingencies: any = allContingencies.ninetyDegrees, startingPosition = up) {
  return class extends BasicProgress {
    constructor() {
        super(contingencies, startingPosition);
    };
  };
}

function circularProgressFactory(
    horizontal: number = 1,
    vertical: number = 1,
    radius: number = 32,
    angle: number = 0,
    speed: number = 300,
    direction: number = 1
  ) {
  return class extends CircularProgress {
    constructor() {
      super(horizontal, vertical, radius, angle, speed, direction);
    }
  }
}

export default {
  'red': {
    ...defaultAttributes,
    progress: progressFactory(),
  },
  'green': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.ninetyDegreesCounterClockwise, left),
  },
  'blue': {
    ...defaultAttributes,
    progress: progressFactory(),
  },
  'yellow': {
    ...defaultAttributes,
    progress: progressFactory(),
  },

  'purple': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.oneEightyDegrees, left),
  },
  'brown': {
    ...defaultAttributes,
    progress: DiagonalProgress,
  },
  'grey': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.oneEightyDegrees, right),
  },
  'cyaan': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.oneEightyDegrees, up),
  },
  'magenta': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.oneEightyDegrees, down),
  },
  'black': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.ninetyDegreesCounterClockwise, right),
  },
  'orange': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.wallHugger, right),
  },
  'pink': {
    ...defaultAttributes,
    progress: progressFactory(allContingencies.stageFright, left),
  },

  'teal': {
    ...defaultAttributes,
    progress: circularProgressFactory(1, 0),
  },
  'navy': {
    ...defaultAttributes,
    progress: circularProgressFactory(1, 1, 32, 0, 100),
  },
  'burlywood': {
    ...defaultAttributes,
    progress: circularProgressFactory(0, 1, 32, 0, 200, -1),
  }
};
