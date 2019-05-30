import BasicProgress from './BasicProgress';
import DiagonalProgress from './DiagonalProgress';
import CircularProgress from './CircularProgress';

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
    progress: progressFactory(),
  },
  'green': {
    progress: progressFactory(allContingencies.ninetyDegreesCounterClockwise, left),
  },
  'blue': {
    progress: progressFactory(),
  },
  'yellow': {
    progress: progressFactory(),
  },

  'purple': {
    progress: progressFactory(allContingencies.oneEightyDegrees, left),
  },
  'brown': {
    progress: DiagonalProgress,
  },
  'grey': {
    progress: progressFactory(allContingencies.oneEightyDegrees, right),
  },
  'cyaan': {
    progress: progressFactory(allContingencies.oneEightyDegrees, up),
  },
  'magenta': {
    progress: progressFactory(allContingencies.oneEightyDegrees, down),
  },
  'black': {
    progress: progressFactory(allContingencies.ninetyDegreesCounterClockwise, right),
  },
  'orange': {
    progress: progressFactory(allContingencies.wallHugger, right),
  },
  'pink': {
    progress: progressFactory(allContingencies.stageFright, left),
  },

  'teal': {
    progress: circularProgressFactory(1, 0),
  },
  'navy': {
    progress: circularProgressFactory(1, 1, 32, 0, 100),
  },
  'burlywood': {
    progress: circularProgressFactory(0, 1, 32, 0, 200, -1),
  }
};
