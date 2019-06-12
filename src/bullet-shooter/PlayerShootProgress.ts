import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import BulletFactory from './BulletFactory';
import global from '../lib/Global';

const pixelsPerSecond = 200;
const timeToNextShot = 500;

export default class PlayerShootProgress implements IProgress {
  private lastShotFired: number;
  constructor() {
    this.lastShotFired = null;
  }

  public progress(actor: Actor) {
    if (global.keyboard.state.space && this.canFire()) {
      BulletFactory.addBullet(actor.x, actor.y, 0, actor.direction, 'playerBullet');
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
}
