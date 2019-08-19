import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress'
import BasicPlayerConditionProgress from '../resources/BasicPlayerConditionProgress'
import PlayerStateChanger from './PlayerStateChanger';
import BaddyStateChanger from './BaddyStateChanger';
import BasicProgress from '../resources/BasicProgress';
import NoProgress from '../resources/NoProgress';
import NoStateChange from '../resources/NoStateChange';
import DiagonalProgress from '../resources/DiagonalProgress';
import SphynxProgress from './SphynxProgress';
import SphynxStateChanger from './SphynxStateChanger';

const fourtyFiveDegrees = 1;
const ninetyDegrees = 2;
const oneEightyDegrees = 4;
const twoSeventyDegrees = 6;

const clockwise = 1;
const counterClockwise = -1;
const pixelsPerSecond = 160;

const contingencies = {
  baddy: {
    default: counterClockwise * ninetyDegrees
  },
  blue: {
    conditions: {
      directions: [ 2 ],
      turn: ninetyDegrees,
      all: false
    },
    default: counterClockwise * ninetyDegrees
  }
}

class ModifiedPlayerDirectionProgress extends BasicPlayerDirectionProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

class BaddyProgress extends BasicProgress {
  constructor() {
    super(contingencies.baddy, pixelsPerSecond);
  }
}

class BlueProgress extends BasicProgress {
  constructor() {
    super(contingencies.blue, pixelsPerSecond);
  }
}

export default {
  'player': {
    progress: [
      ModifiedPlayerDirectionProgress,
      BasicPlayerConditionProgress
    ],
    stateChanger: PlayerStateChanger
  },
  'coin': {
    progress: [
      NoProgress
    ],
    stateChanger: NoStateChange
  },
  'baddy': {
    progress: [
      BaddyProgress
    ],
    stateChanger: BaddyStateChanger
  },
  'blue': {
    progress: [
      BlueProgress
    ],
    stateChanger: BaddyStateChanger
  },
  'razor': {
    progress: [
      DiagonalProgress
    ],
    stateChanger: NoStateChange
  },
  'sphynx': {
    progress: [
      SphynxProgress
    ],
    stateChanger: SphynxStateChanger
  },
};
