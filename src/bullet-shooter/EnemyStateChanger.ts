import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = ['up', 'right', 'down', 'left'];

export default class EnemyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const state = directions[actor.direction];
    actor.updateState(state);
  }
}
