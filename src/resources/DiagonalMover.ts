/**
* This class can create behaviour for the actors making them turn 90, -90 or
* 180 degrees, coming from a diagonal direction.
*/

import Actor from '../lib/Actor';
import IMovable from '../lib/IMovable';
import global from '../lib/Global';

const pixelsPerSecond = 100;

const directions = [
  // The directions in clockwise fashion
  { x: -1, y: -1 }, // upper-left
  { x: 1, y: -1 }, // upper-right
  { x: 1, y: 1 }, // lower-right
  { x: -1, y: 1 }, // lower-left
]

export default class DiagonalMover implements IMovable {
  private direction: any;

  constructor(
    private directionIndex = 0
  ) {
    this.direction = directions[this.directionIndex];
  }

  public progress(actor: Actor) {
    const elapsedTime: number = global.clock.elapsedTime;
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);
    const probeY = actor.y + (movement * this.direction.y);
    const probeX = actor.x + (movement * this.direction.x);

    if (actor.checkGrid(probeX, probeY)) {
      actor.x = probeX;
      actor.y = probeY;
    } else {
      // Get the report on all the surrounding grid spots
      const report = actor.gridReport(probeX, probeY);

      // Pick out the proper values we need (the environment report rotated)
      const v = [
        report[(this.directionIndex - 1 + report.length) % report.length],
        report[(this.directionIndex + report.length) % report.length],
        report[(this.directionIndex + 1 + report.length) % report.length]
      ];

      // Determine what to do

      // By default, turn around
      let direction = 2;
      // If we have something to our left, turn 90 deg
      if ((v[0] && v[1] && !v[2]) || (v[0] && !v[1] && !v[2])) {
        direction = -1;
      // If we have something to our right, turn -90 deg
      } else if ((!v[0] && !v[1] && v[2]) || (!v[0] && v[1] && v[2])) {
        direction = 1;
      }

      // We will need to change directions in the end
      this.centerActorAndChangeDirection(actor, gridX, gridY, direction);
    }
  }

  private centerActorAndChangeDirection(actor, gridX, gridY, direction) {
    // Make sure the actor is as close to the wall as he can get
    if(this.direction.x === 1) actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
    if(this.direction.x === -1) actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
    if(this.direction.y === 1) actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
    if(this.direction.y === -1) actor.y = (gridY * global.config.unit) + (global.config.unit / 2);

    // And change the direction in the way specified
    this.directionIndex = (this.directionIndex + direction + directions.length) % directions.length;
    this.direction = directions[this.directionIndex];
  }
}
