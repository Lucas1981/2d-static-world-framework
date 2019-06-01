import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import global from '../lib/Global';

const bulletSpeed = 300;
const lifetime = 200;

const directions = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

export default class BulletProgress implements IProgress {
  private timeCreated: number;

  constructor() {
    this.timeCreated = global.clock.getTime();
  }

  public progress(actor: Actor) {
    actor.x += directions[actor.direction].x * global.clock.elapsedTime * bulletSpeed / 1000;
    actor.y += directions[actor.direction].y * global.clock.elapsedTime * bulletSpeed / 1000;
    if (global.clock.getTime() - this.timeCreated > lifetime) {
      actor.die();
    }
  }
}
