import Actor from '../lib/actor/Actor';
import BasicPlayerProgress from '../resources/BasicPlayerProgress';
import global from '../lib/Global';

const qualities = [ 'vulnerable', 'invincible' ]

export default class PlayerProgress extends BasicPlayerProgress {
  private lock: boolean;
  private quality: string;
  constructor() {
    super();
    this.quality = qualities[0];
    this.lock = false;
  }

  progress(actor: Actor) {
    if (global.keyboard.state.space && !this.lock) {
      this.lock = true;
      this.quality = qualities[(qualities.indexOf(this.quality) + 1) % qualities.length];
    }

    if (!global.keyboard.state.space) this.lock = false;

    super.progress(actor);
  }

  public updateAnimationKey(actor: Actor) {
    actor.updateAnimationKey(this.quality);
  }
}
