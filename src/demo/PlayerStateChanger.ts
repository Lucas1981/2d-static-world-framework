import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const conditions = ['stand', 'walk', 'dying'];
const directions = [ 'up', 'right', 'down', 'left' ];

export default class EnemyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const condition = conditions[actor.condition];
    const direction = directions[actor.direction];
    actor.updateState(`${condition}-${direction}`);
  }
}
