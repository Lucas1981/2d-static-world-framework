import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import ContourCollision from '../lib/ContourCollision';
import { DirectionTypes } from '../resources/DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;
const defaultBandMargin = 4;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };

export default class CustomPlayerDirectionProgress implements IProgress {
  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond,
    private bandMargin = defaultBandMargin,
    private start = new Date()
  ) {}

  public progress(actor: Actor): void {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const elapsedTime: number = global.clock.elapsedTime;
    const grid = global.maps[global.activeMap].grid;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, unit - 1);
    const state: any = global.keyboard.state;

    // 1. make sure we are not stuck in a wall

    // if (preCheck.left && !preCheck.right) actor.x = altXRight;
    // if (!preCheck.left && preCheck.right) actor.x = altXLeft;
    // if (preCheck.up && !preCheck.down) actor.y = altYDown;
    // if (!preCheck.up && preCheck.down) actor.y = altYUp;

    // 2. Then process any movements

    if (state.up) {
      const probeY: number = actor.y - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY });
      actor.y = probeY - result.top;
      actor.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeY: number = actor.y + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY });
      actor.y = probeY + result.bottom;
      actor.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y });
      actor.x = probeX - result.left;
      actor.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y });
      console.log(result);
      actor.x = probeX + result.right;
      actor.direction = DirectionTypes.Up;
    }
  }
}
