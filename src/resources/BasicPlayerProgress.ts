import IProgress from '../lib/IProgress';
import Actor from '../lib/Actor';
import { StateTypes } from './StateTypes';
import { DirectionTypes } from './DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;

export default class BasicPlayerProgress implements IProgress {
  public state: StateTypes;
  public direction: DirectionTypes;

  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond
  ) {
    this.state = StateTypes.Standing;
    this.direction = DirectionTypes.Up;
  }

  public progress(actor: Actor): void {
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const grid = global.maps[global.activeMap].grid;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const state: any = global.keyboard.state;
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);

    this.state = StateTypes.Standing; // Assume we are not moving

    if (state.up) {
      const probeX: number = actor.x;
      const probeY: number = actor.y - movement;
      if(grid.checkGrid(probeX, probeY)) actor.y -= movement;
      else actor.y = (gridY * global.config.unit) + (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeX: number = actor.x;
      const probeY: number = actor.y + movement;
      if(grid.checkGrid(probeX, probeY)) actor.y += movement;
      else actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const probeY: number = actor.y;
      if(grid.checkGrid(probeX, probeY)) actor.x -= movement;
      else actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const probeY: number = actor.y;
      if(grid.checkGrid(probeX, probeY)) actor.x += movement;
      else actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Right;
    }
    if (state.escape) {
      global.gameState = GameState.ResetGame;
    }

    this.updateAnimationKey(actor);

  }

  public updateAnimationKey(actor: Actor) {
    // Default behaviour
    actor.updateAnimationKey(`${this.state}-${this.direction}`);
  }
}
