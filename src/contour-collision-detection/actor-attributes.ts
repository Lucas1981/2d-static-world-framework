import CustomPlayerDirectionProgress from './CustomPlayerDirectionProgress';
import NoStateChange from '../resources/NoStateChange';
import BasicPlayerConditionProgress from '../resources/BasicPlayerConditionProgress';
import PositionCamera from '../resources/PositionCamera';

const pixelsPerSecond = 200;

class PlayerProgress extends CustomPlayerDirectionProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'actor-1': {
    progress: [
      PlayerProgress,
      BasicPlayerConditionProgress,
      PositionCamera
    ],
    stateChanger: NoStateChange
  },
}
