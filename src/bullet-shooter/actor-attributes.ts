import Enemy1Progress from './Enemy1Progress';
import Enemy2Progress from './Enemy2Progress';
import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress';
import PlayerShootProgress from './PlayerShootProgress';
import BasicStateChanger from './BasicStateChanger';

export default {
  'player': {
    progress: [
      BasicPlayerDirectionProgress,
      PlayerShootProgress
    ],
    stateChanger: BasicStateChanger
  },
  'enemy1': {
    progress: [
      Enemy1Progress
    ],
    stateChanger: BasicStateChanger
  },
  'enemy2': {
    progress: [
      Enemy2Progress
    ],
    stateChanger: BasicStateChanger
  },
}
