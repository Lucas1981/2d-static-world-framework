import IActionable from '../lib/IActionable';
import IHurtable from '../lib/IHurtable';
import IMovable from '../lib/IMovable';
import Actor from '../lib/Actor';
import Grid from '../lib/Grid';
import { DirectionTypes } from '../resources/DirectionTypes';
import global from '../lib/Global';

const pixelsPerSecond = 100;
const directions = [ 'up', 'down', 'left', 'right' ];

class EnemyActive implements IActionable {
  public isActive(): Boolean { return true; }
}

class EnemyHurtable implements IHurtable {
  public canHurt(): Boolean { return true; }
}

class EnemyMover implements IMovable {

  private direction: any;
  private directionChange: any;
  private directionChangeCutoff: number;

  constructor() {
    this.directionChangeCutoff = Math.floor(Math.random() * 500) + 150;
    this.directionChange = global.clock.getTime();
    this.direction = directions[0];
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
      this.direction = this.changeDirection();
    }

    switch(this.direction) {
      case DirectionTypes.Up:
        probeY = actor.y - movement;
        if(grid.checkGrid(actor.x, probeY)) actor.y -= movement;
        else {
          actor.y = (gridY * global.config.unit) + (global.config.unit / 2);
          this.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Down:
        probeY = actor.y + movement;
        if(grid.checkGrid(actor.x, probeY)) actor.y += movement;
        else {
          actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
          this.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Left:
        probeX = actor.x - movement;
        if(grid.checkGrid(probeX, actor.y)) actor.x -= movement;
        else {
          actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
          this.direction = this.changeDirection();
        }
        break;
      case DirectionTypes.Right:
        probeX = actor.x + movement;
        if(grid.checkGrid(probeX, actor.y)) actor.x += movement;
        else {
          actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
          this.direction = this.changeDirection();
        }
        break;
      default:
        throw "Unknown direction type";
    }

    actor.updateAnimationKey(`walk-${this.direction}`);
  }

  private changeDirection() {
    const index: number = Math.floor(Math.random() * 4);
    const direction: string = directions[index];
    this.directionChange = global.clock.getTime();
    this.directionChangeCutoff = Math.floor(Math.random() * 300) + 150;
    return direction;
  }
}

export { EnemyMover, EnemyHurtable, EnemyActive };
