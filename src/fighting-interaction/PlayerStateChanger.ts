import Actor from '../lib/actor/Actor';
import IStateChange from '../lib/actor/IStateChange';
import { playerStates } from './states';

export default class EnemyStateChanger implements IStateChange {
  constructor() {}
  public changeState(actor: Actor) {
    const state = playerStates[actor.condition];
    actor.updateState(state);
  }
}
