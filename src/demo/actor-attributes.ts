import EnemyProgress from './EnemyProgress';
import NoProgress from '../resources/NoProgress';
import PlayerProgress from './PlayerProgress';
import EnemyStateChanger from './EnemyStateChanger';
import PlayerStateChanger from './PlayerStateChanger';
import NoStateChange from '../resources/NoStateChange';

export default {
  'player': {
    progress: [
      PlayerProgress
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
      EnemyProgress
    ],
    stateChanger: EnemyStateChanger
  },
  'thug': {
    progress: [
      EnemyProgress
    ],
    stateChanger: EnemyStateChanger
  }
};
