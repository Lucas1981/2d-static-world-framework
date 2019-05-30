/**
* This class can create behaviour for the actors making them turn in any direction
* when they hit a wall, rotating either clockwise or counterclockwise, starting off in
* any direction
*/

import Actor from '../lib/Actor';
import Grid from '../lib/Grid';
import IProgress from '../lib/IProgress';
import global from '../lib/Global';

const pixelsPerSecond = 100;

const directions = [
  // The directions in clockwise fashion
  { x: 0, y: -1 }, // up
  { x: 1, y: -1 }, // upper-right
  { x: 1, y: 0}, // right
  { x: 1, y: 1 }, // lower-right
  { x: 0, y: 1 }, // down
  { x: -1, y: 1 }, // lower-left
  { x: -1, y: 0 }, // left
  { x: -1, y: -1 }, // upper-left
]

export default abstract class BasicProgress implements IProgress {
  private direction: any;
  private elapsedTime: number;
  private timer: any;

  constructor(
    private contingencies: any,
    private directionIndex: number = 0
  ) {
    this.direction = directions[this.directionIndex];
    this.elapsedTime = 0;
  }

  public progress(actor: Actor) {
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);

    this.checkForDirectionChange(elapsedTime, movement, actor);
    this.checkForCollision(elapsedTime, movement, actor);
  }

  private checkForDirectionChange(elapsedTime: number, movement: number, actor: Actor) {
    // Don't bother with this if we don't have any conditions
    if (!('conditions' in this.contingencies)) return;
    const conditions = this.contingencies.conditions;
    const halfUnit = global.config.unit / 2;
    const allFlags = new Array(conditions.directions.length).fill(false);

    // What is the position of the current tip? It starts with the actor location, and then move half a unit in the current direction
    const currTipX = actor.x + (this.direction.x * halfUnit);
    const currTipY = actor.y + (this.direction.y * halfUnit);
    // What are the grid spots of the current tip?
    const gridX = Math.floor(currTipX / global.config.unit);
    const gridY = Math.floor(currTipY / global.config.unit);
    // What is the position of the next tip?
    const probeY = actor.y + (movement * this.direction.y) + (this.direction.y * halfUnit);
    const probeX = actor.x + (movement * this.direction.x) + (this.direction.x * halfUnit);
    // What are the grid spots of the next tip?
    const nextGridX = Math.floor(probeX / global.config.unit);
    const nextGridY = Math.floor(probeY / global.config.unit);

    // Are we about to hit a new tile? That is the most important part of this
    if (gridX !== nextGridX || gridY !== nextGridY) {
      // If indeed we are, we need to check for all conditions if one is met
      for (let i = 0; i < conditions.directions.length; i++) {
        // For each of these conditions, we have to find the tile that we want to probe
        const conditionDirection = conditions.directions[i];
        const directionIndex = (this.directionIndex + conditionDirection + directions.length) % directions.length;
        const direction = directions[directionIndex];
        const targetTileX = gridX + direction.x;
        const targetTileY = gridY + direction.y;
        // And then finally check if that targeted tile is of a specific quality
        if (global.maps[global.activeMap].grid.isSafe(targetTileX, targetTileY)) {
          allFlags[i] = true;
          if (!conditions.all || allFlags.every(e => e === true)) {
            // If it is, then change direction of the actor
            this.centerActorAndChangeDirection(actor, gridX, gridY, conditions.turn);
            // We are done with the for loop
            break;
            // After this, the checkForCollision will take over and push the actor just into the next tile
            // So only when the next tile is hit will another check take place
          }
        }
      }
    }
  }

  private checkForCollision(elapsedTime: number, movement: number, actor: Actor) {
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);
    const grid: Grid = global.maps[global.activeMap].grid;
    const probeY = actor.y + (movement * this.direction.y);
    const probeX = actor.x + (movement * this.direction.x);

    this.elapsedTime += elapsedTime;
    const timeIsUp = 'timer' in this.contingencies ? this.elapsedTime > this.contingencies.timer : false;

    // Do we hit a wall if we are trying this or is it time to move on?
    if (grid.checkGrid(probeX, probeY) && !timeIsUp) {
      // If not, do the usual
      actor.x = probeX;
      actor.y = probeY;
    } else {
      this.elapsedTime = 0;
      this.centerActorAndChangeDirection(actor, gridX, gridY, this.contingencies.default);
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