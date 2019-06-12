import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import BulletFactory from './BulletFactory';
import global from '../lib/Global';

const directions = ['up', 'right', 'down', 'left'];

const timeToNextShot = 1000;

export default class Enemy2Progress {
  private lastShotFired: number;

  constructor() {
    this.lastShotFired = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    if (now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = global.clock.getTime();
      BulletFactory.addBullet(actor.x, actor.y, 0, actor.direction, 'enemyBullet');
    }
  }
}
