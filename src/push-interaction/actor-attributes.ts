import NoProgress from '../resources/NoProgress';
import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress';
import NoStateChange from '../resources/NoStateChange';

const pixelsPerSecond = 200;

class PlayerProgress extends BasicPlayerDirectionProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'player': {
    progress: [PlayerProgress],
    stateChanger: NoStateChange
  },
  'box': {
    progress: [NoProgress],
    stateChanger: NoStateChange
  },
}
