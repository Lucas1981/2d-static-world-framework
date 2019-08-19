import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = ['up', 'right', 'down', 'left'];
const conditions = ['stand', 'walk'];

export default class PlayerStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const condition = conditions[actor.condition];
    const direction = directions[actor.direction];
    actor.updateState(`${condition}-${direction}`);
  }
}
