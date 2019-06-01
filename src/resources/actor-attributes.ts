import BasicProgress from './BasicProgress';
import DiagonalProgress from './DiagonalProgress';
import CircularProgress from './CircularProgress';
import NoStateChange from './NoStateChange';

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

function progressFactory(contingencies: any = allContingencies.ninetyDegrees) {
  return class extends BasicProgress {
    constructor() {
        super(contingencies);
    };
  };
}

function circularProgressFactory(
    horizontal: number = 1,
    vertical: number = 1,
    radius: number = 32,
    angle: number = 0,
    speed: number = 300,
  ) {
  return class extends CircularProgress {
    constructor() {
      super(horizontal, vertical, radius, angle, speed);
    }
  }
}

export default {
  'red': {
    progress: [progressFactory()],
    stateChanger: NoStateChange
  },
  'green': {
    progress: [progressFactory(allContingencies.ninetyDegreesCounterClockwise)],
    stateChanger: NoStateChange
  },
  'blue': {
    progress: [progressFactory()],
    stateChanger: NoStateChange
  },
  'yellow': {
    progress: [progressFactory()],
    stateChanger: NoStateChange
  },

  'purple': {
    progress: [progressFactory(allContingencies.oneEightyDegrees)],
    stateChanger: NoStateChange
  },
  'brown': {
    progress: [DiagonalProgress],
    stateChanger: NoStateChange
  },
  'grey': {
    progress: [progressFactory(allContingencies.oneEightyDegrees)],
    stateChanger: NoStateChange
  },
  'cyaan': {
    progress: [progressFactory(allContingencies.oneEightyDegrees)],
    stateChanger: NoStateChange
  },
  'magenta': {
    progress: [progressFactory(allContingencies.oneEightyDegrees)],
    stateChanger: NoStateChange
  },
  'black': {
    progress: [progressFactory(allContingencies.ninetyDegreesCounterClockwise)],
    stateChanger: NoStateChange
  },
  'orange': {
    progress: [progressFactory(allContingencies.wallHugger)],
    stateChanger: NoStateChange
  },
  'pink': {
    progress: [progressFactory(allContingencies.stageFright)],
    stateChanger: NoStateChange
  },

  'teal': {
    progress: [circularProgressFactory(1, 0)],
    stateChanger: NoStateChange
  },
  'navy': {
    progress: [circularProgressFactory(1, 1, 32, 0, 100)],
    stateChanger: NoStateChange
  },
  'burlywood': {
    progress: [circularProgressFactory(0, 1, 32, 0, 200)],
    stateChanger: NoStateChange
  }
};
