import IProgress from '../lib/IProgress';
import Actor from '../lib/Actor';
import global from '../lib/Global';

const bulletSpeed = 300;
const lifetime = 200;

const directions = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }
}

export default class BulletProgress implements IProgress {
  private timeCreated: number;

  constructor(
    private direction
  ) {
    this.timeCreated = global.clock.getTime();
  }

  public progress(actor: Actor) {
    actor.x += directions[this.direction].x * global.clock.elapsedTime * bulletSpeed / 1000;
    actor.y += directions[this.direction].y * global.clock.elapsedTime * bulletSpeed / 1000;
    if (global.clock.getTime() - this.timeCreated > lifetime) {
      actor.die();
    }
  }
}
