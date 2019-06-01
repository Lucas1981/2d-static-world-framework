import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import { enemyStates } from './states';
import global from '../lib/Global';

const timeToNextStateChange = 1000;

export default class Enemy2Progress implements IProgress {
  private lastStateChange: number;

  constructor() {
    this.lastStateChange = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    if (now - this.lastStateChange > timeToNextStateChange) {
      this.lastStateChange = now;
      actor.condition = (actor.condition + 1) % enemyStates.length;
    }
  }

}
