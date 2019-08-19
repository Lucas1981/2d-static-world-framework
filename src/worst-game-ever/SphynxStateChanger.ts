import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = ['up', 'right', 'down', 'left'];
const conditions = ['rest', 'fire'];

export default class BaddyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const direction = directions[actor.direction];
    const condition = conditions[actor.condition];
    actor.updateState(`${condition}-${direction}`);
  }
}
