import NoProgress from '../resources/NoProgress';
import BasicPlatformPlayerDirectionProgress from '../resources/BasicPlatformPlayerDirectionProgress';
import NoStateChange from '../resources/NoStateChange';
import SarahStateChanger from './SarahStateChanger';
import BasicPlatformPlayerConditionProgress from '../resources/BasicPlatformPlayerConditionProgress';
import PositionCamera from '../resources/PositionCamera';

const pixelsPerSecond = 300;

class PlayerProgress extends BasicPlatformPlayerDirectionProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'actor-1': {
    progress: [
      PlayerProgress,
      BasicPlatformPlayerConditionProgress,
      PositionCamera
    ],
    stateChanger: SarahStateChanger
  },
}
