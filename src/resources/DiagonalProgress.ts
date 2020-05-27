/**
* This class can create behaviour for the actors making them turn 90, -90 or
* 180 degrees, coming from a diagonal direction.
*/

import Actor from '../lib/actor/Actor';
import Grid from '../lib/Grid';
import IProgress from '../lib/actor/IProgress';
import global from '../lib/Global';

const pixelsPerSecond = 100;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };

const directions = [
  // The directions in clockwise fashion
  { x: -1, y: -1 }, // upper-left
  { x: 1, y: -1 }, // upper-right
  { x: 1, y: 1 }, // lower-right
  { x: -1, y: 1 }, // lower-left
]

export default class DiagonalProgress implements IProgress {

  constructor() {}

  public progress(actor: Actor) {
    const direction = directions[actor.direction];
    const elapsedTime: number = global.clock.elapsedTime;
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);
    const grid: Grid = global.maps[global.activeMap].grid;
    const probeY: number = actor.y + (movement * direction.y);
    const probeX: number = actor.x + (movement * direction.x);

    const animationKey: number = actor.state.animationKey;
    const animation: any = global.animations.data[animationKey];
    const boundingBox: any = 'boundingBox' in animation && animation.boundingBox ? animation.boundingBox : defaultBoundingBox;
    const width: number = global.config.unit - (boundingBox.left + boundingBox.right);
    const height: number = global.config.unit - (boundingBox.top + boundingBox.bottom);

    if (grid.checkGrid(probeX, probeY, width, height).all) {
      actor.x = probeX;
      actor.y = probeY;
    } else {
      // Get the report on all the surrounding grid spots
      const report = grid.gridReport(probeX, probeY, width, height);

      // Pick out the proper values we need (the environment report rotated)
      const v = [
        report[(actor.direction - 1 + report.length) % report.length],
        report[(actor.direction + report.length) % report.length],
        report[(actor.direction + 1 + report.length) % report.length]
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

  private centerActorAndChangeDirection(actor: Actor, gridX: number, gridY: number, newDirection: number) {
    // Make sure the actor is as close to the wall as he can get
    const direction = directions[actor.direction];
    if(direction.x === 1) actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
    if(direction.x === -1) actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
    if(direction.y === 1) actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
    if(direction.y === -1) actor.y = (gridY * global.config.unit) + (global.config.unit / 2);

    // And change the direction in the way specified
    actor.direction = (actor.direction + newDirection + directions.length) % directions.length;
  }
}
