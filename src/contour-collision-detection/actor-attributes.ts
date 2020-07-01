import NoProgress from '../resources/NoProgress';
import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress';
import NoStateChange from '../resources/NoStateChange';
import BasicPlayerConditionProgress from '../resources/BasicPlayerConditionProgress'
import PositionCamera from '../resources/PositionCamera';

const pixelsPerSecond = 200;

class PlayerProgress extends BasicPlayerDirectionProgress {
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
