import NoProgress from '../resources/NoProgress';
import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress';
import NoStateChange from '../resources/NoStateChange';
import SarahStateChanger from './SarahStateChanger';
import BasicPlayerConditionProgress from '../resources/BasicPlayerConditionProgress'
import PositionCamera from '../resources/PositionCamera';

const pixelsPerSecond = 200;

class PlayerProgress extends BasicPlayerDirectionProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'Sarah': {
    progress: [
      PlayerProgress,
      BasicPlayerConditionProgress,
      PositionCamera
    ],
    stateChanger: SarahStateChanger
  },
  'box': {
    progress: [NoProgress],
    stateChanger: NoStateChange
  },
}
