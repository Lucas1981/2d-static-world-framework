import EnemyProgress from './EnemyProgress';
import BasicPlayerDirectionProgress from '../resources/BasicPlayerDirectionProgress';
import PlayerProgress from './PlayerProgress';
import PlayerStateChanger from './PlayerStateChanger';
import EnemyStateChanger from './EnemyStateChanger';
import NoStateChange from '../resources/NoStateChange';

export default {
  'player': {
    progress: [
      BasicPlayerDirectionProgress,
      PlayerProgress
    ],
    stateChanger: PlayerStateChanger
  },
  'enemy': {
    progress: [EnemyProgress],
    stateChanger: EnemyStateChanger
  },
}
