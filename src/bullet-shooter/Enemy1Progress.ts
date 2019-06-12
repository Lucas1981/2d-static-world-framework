import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import BulletFactory from './BulletFactory';
import global from '../lib/Global';

const pixelsPerSecond = 200;
const timeToNextShot = 500;
const numberOfDirections = 4;

export default class Enemy1Progress implements IProgress {
  private lastShotFired: number;

  constructor() {
    this.lastShotFired = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    if (now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = global.clock.getTime();
      actor.direction = ((actor.direction) + 1) % numberOfDirections;
      BulletFactory.addBullet(actor.x, actor.y, 0, actor.direction, 'enemyBullet');
    }
  }
}
