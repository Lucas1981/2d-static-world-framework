import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import global from '../lib/Global';

const states = [ 'good', 'bad' ];
const timeToNextStateChange = 1000;

export default class Enemy2Progress implements IProgress {
  public state;
  private lastStateChange: number;

  constructor() {
    this.state = states[0];
    this.lastStateChange = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    if (now - this.lastStateChange > timeToNextStateChange) {
      this.lastStateChange = now;
      this.state = states[(states.indexOf(this.state) + 1) % states.length];
      this.updateAnimationKey(actor);
    }
  }

  public updateAnimationKey(actor: Actor) {
    actor.updateAnimationKey(this.state);
  }

}
