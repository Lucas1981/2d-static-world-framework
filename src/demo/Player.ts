import IActionable from '../lib/IActionable';
import IHurtable from '../lib/IHurtable';
import IMovable from '../lib/IMovable';
import Actor from '../lib/Actor';
import { DirectionTypes } from './DirectionTypes';
import { StateTypes } from './StateTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const pixelsPerSecond = 150;

class PlayerActive implements IActionable {
  public isActive(): Boolean { return true; }
}

class PlayerHurtable implements IHurtable {
  public canHurt(): Boolean { return false; }
}

class PlayerMover implements IMovable {
  private state: StateTypes;
  private direction: DirectionTypes;

  constructor() {
    this.state = StateTypes.Standing;
    this.direction = DirectionTypes.Up;
  }

  public progress(actor: Actor): void {
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const movement: number = Math.min(pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const state: any = global.keyboard.state;
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);

    this.state = StateTypes.Standing; // Assume we are not moving

    if (state.up) {
      const probeX: number = actor.x;
      const probeY: number = actor.y - movement;
      if(actor.checkGrid(probeX, probeY)) actor.y -= movement;
      else actor.y = (gridY * global.config.unit) + (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeX: number = actor.x;
      const probeY: number = actor.y + movement;
      if(actor.checkGrid(probeX, probeY)) actor.y += movement;
      else actor.y = ((gridY + 1) * global.config.unit) - (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const probeY: number = actor.y;
      if(actor.checkGrid(probeX, probeY)) actor.x -= movement;
      else actor.x = (gridX * global.config.unit) + (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const probeY: number = actor.y;
      if(actor.checkGrid(probeX, probeY)) actor.x += movement;
      else actor.x = ((gridX + 1) * global.config.unit) - (global.config.unit / 2);
      this.state = StateTypes.Walking;
      this.direction = DirectionTypes.Right;
    }
    if (state.escape) {
      global.gameState = GameState.ResetGame;
    }

    actor.updateAnimationKey(`${this.state}-${this.direction}`);

  }
}

export { PlayerActive, PlayerHurtable, PlayerMover };
