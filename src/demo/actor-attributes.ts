import { EnemyMover, EnemyHurtable, EnemyActive } from './Enemy';
import { ItemActive, ItemHurtable, ItemMover } from './Item';
import { PlayerActive, PlayerHurtable, PlayerMover } from './Player';

export default {
  'player': {
    mover: PlayerMover,
    hurtable: PlayerHurtable,
    active: PlayerActive
  },
  'coin': {
    mover: ItemMover,
    hurtable: ItemHurtable,
    active: ItemActive
  },
  'baddy': {
    mover: EnemyMover,
    hurtable: EnemyHurtable,
    active: EnemyActive
  },
  'thug': {
    mover: EnemyMover,
    hurtable: EnemyHurtable,
    active: EnemyActive
  }
};
