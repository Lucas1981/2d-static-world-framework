import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = ['up', 'upperLeft', 'right', 'lowerLeft', 'down', 'lowerRight', 'left', 'upperRight'];

export default class BaddyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const direction = directions[actor.direction];
    actor.updateState(`walk-${direction}`);
  }
}
