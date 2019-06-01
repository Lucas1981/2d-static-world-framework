import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import Grid from '../lib/Grid';
import { DirectionTypes } from '../resources/DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const pixelsPerSecond = 150;

export default class PlayerProgress implements IProgress {
  constructor() {}

  public progress(actor: Actor): void {
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const state: any = global.keyboard.state;
    const grid: Grid = global.maps[global.activeMap].grid;
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);

    if (state.up) {
      const probeX: number = actor.x;
      const probeY: number = actor.y - movement;
      if(grid.checkGrid(probeX, probeY)) actor.y -= movement;
      else actor.y = (gridY * global.config.unit) + (global.config.unit / 2);
      actor.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeX: number = actor.x;
      const probeY: number = actor.y + movement;
      if(grid.checkGrid(probeX, probeY)) actor.y += movement;
      else actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
      actor.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const probeY: number = actor.y;
      if(grid.checkGrid(probeX, probeY)) actor.x -= movement;
      else actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
      actor.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const probeY: number = actor.y;
      if(grid.checkGrid(probeX, probeY)) actor.x += movement;
      else actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
      actor.direction = DirectionTypes.Right;
    }
  }
};
