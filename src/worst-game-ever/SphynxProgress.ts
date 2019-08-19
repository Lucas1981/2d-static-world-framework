import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import BulletFactory from './BulletFactory';
import global from '../lib/Global';

const timeToNextShot = 2000;
const timeToCloseMouth = 400;
const rest = 0;
const fire = 1;

export default class Enemy2Progress {
  private lastShotFired: number;
  private openedMouth: number;

  constructor() {
    this.lastShotFired = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    if (now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = global.clock.getTime();
      this.openedMouth = global.clock.getTime();
      actor.condition = fire;
      BulletFactory.addBullet(actor.x, actor.y, 0, actor.direction, 'eye');
    }

    if (now - this.openedMouth > timeToCloseMouth) {
      actor.condition = rest;
    }
  }
}
