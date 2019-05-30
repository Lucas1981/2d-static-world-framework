import NoProgress from '../resources/NoProgress';
import BasicPlayerProgress from '../resources/BasicPlayerProgress';

const pixelsPerSecond = 200;

class PlayerProgress extends BasicPlayerProgress {
  constructor() {
    super(pixelsPerSecond);
  }
}

export default {
  'player': {
    progress: PlayerProgress,
  },
  'box': {
    progress: NoProgress,
  },
}
