import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = ['up', 'right', 'down', 'left'];
const conditions = ['stand', 'walk', 'dying', 'jump', 'fall'];

export default class SarahStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const condition = conditions[actor.condition];
    const direction = directions[actor.direction];
    actor.updateState(`${condition}-${direction}`);
  }
}
