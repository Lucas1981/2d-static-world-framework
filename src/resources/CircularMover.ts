/**
* This class can create behaviour for the actors making them turn 90, -90 or
* 180 degrees, coming from a diagonal direction.
*/

import Actor from '../lib/Actor';
import IMovable from '../lib/IMovable';
import global from '../lib/Global';

export default abstract class CircularMover implements IMovable {
  constructor(
    private horizontal,
    private vertical,
    private radius,
    private angle,
    private speed, // in degrees per second
    private direction
  ) {}

  public progress(actor: Actor) {
      const elapsedTime: number = global.clock.elapsedTime;
      const movement: number = Math.min(this.speed * elapsedTime / 1000, global.config.unit - 1);
      const angle = this.direction === 1 ? this.angle : (360 - this.angle) % 360;
      this.angle = (this.angle + movement) % 360;
      actor.x = actor.originX + Math.ceil(Math.sin(angle * Math.PI / 180) * this.radius * this.horizontal);
      actor.y = actor.originY + Math.ceil(Math.cos(angle * Math.PI / 180) * this.radius * this.vertical);
  }
}
