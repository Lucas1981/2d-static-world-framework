import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import Grid from '../lib/Grid';
import { DirectionTypes } from '../resources/DirectionTypes';
import global from '../lib/Global';

const pixelsPerSecond = 100;

export default class EnemyProgress implements IProgress {
  private directionChange: any;
  private directionChangeCutoff: number;

  constructor() {
    this.directionChangeCutoff = Math.floor(Math.random() * 500) + 150;
    this.directionChange = global.clock.getTime();
  }

  public progress(actor: Actor): void {
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);
    const grid: Grid = global.maps[global.activeMap].grid;
    let probeY: number;
    let probeX: number;

    if(global.clock.getTime() - this.directionChange >= this.directionChangeCutoff) {
      actor.direction = this.changeDirection();
    }

    switch(actor.direction) {
      case DirectionTypes.Up:
        probeY = actor.y - movement;
        if(grid.checkGrid(actor.x, probeY)) actor.y -= movement;
        else {
          actor.y = (gridY * global.config.unit) + (global.config.unit / 2);
          actor.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Down:
        probeY = actor.y + movement;
        if(grid.checkGrid(actor.x, probeY)) actor.y += movement;
        else {
          actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
          actor.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Left:
        probeX = actor.x - movement;
        if(grid.checkGrid(probeX, actor.y)) actor.x -= movement;
        else {
          actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
          actor.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Right:
        probeX = actor.x + movement;
        if(grid.checkGrid(probeX, actor.y)) actor.x += movement;
        else {
          actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
          actor.direction = this.changeDirection();
        }
        break;
      default:
        throw "Unknown direction type";
    }
  }

  private changeDirection() {
    const direction: number = Math.floor(Math.random() * 4);
    this.directionChange = global.clock.getTime();
    this.directionChangeCutoff = Math.floor(Math.random() * 300) + 150;
    return direction;
  }
};
