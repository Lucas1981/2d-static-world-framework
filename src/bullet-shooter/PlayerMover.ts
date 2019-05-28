import Actor from '../lib/Actor';
import BasicPlayerMover from '../resources/BasicPlayerMover';
import Active from '../resources/Active';
import Benevolent from '../resources/Benevolent';
import BulletMover from './BulletMover';
import global from '../lib/Global';

const pixelsPerSecond = 200;
const timeToNextShot = 500;

export default class PlayerMover extends BasicPlayerMover {
  private lastShotFired: number;
  constructor() {
    super(pixelsPerSecond);
    this.lastShotFired = null;
  }

  public progress(actor: Actor) {
    super.progress(actor);

    if (global.keyboard.state.space && this.canFire()) {
      const actorType = global.gameData.actors.find(e => e.name === 'playerBullet');
      global.maps[global.activeMap].actors.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x,
        actor.y,
        actorType.states,
        new BulletMover(this.direction),
        new Benevolent(),
        new Active(),
      ));
    }
  }

  private canFire() {
    const now = global.clock.getTime();
    if (this.lastShotFired === null || now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = now;
      return true;
    }
    return false;
  }

  public updateAnimationKey(actor: Actor) {
    actor.updateAnimationKey(this.direction);
  }
}
