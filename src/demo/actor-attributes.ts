import EnemyProgress from './EnemyProgress';
import ItemProgress from './ItemProgress';
import PlayerProgress from './PlayerProgress';

export default {
  'player': {
    progress: PlayerProgress,
  },
  'coin': {
    progress: ItemProgress,
  },
  'baddy': {
    progress: EnemyProgress,
  },
  'thug': {
    progress: EnemyProgress,
  }
};
