import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';
import { enemyStates } from './states';

export default class EnemyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const state = enemyStates[actor.condition];
    actor.updateState(state);
  }
}
