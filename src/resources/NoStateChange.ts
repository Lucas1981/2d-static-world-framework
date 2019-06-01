import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';

const directions = [ 'up', 'down', 'left', 'right' ];

export default class EnemyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    /* No state change */
  }
}
