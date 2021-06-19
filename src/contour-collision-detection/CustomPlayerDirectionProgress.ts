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
    const elapsedTime: number = global.clock.elapsedTime;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, unit - 1);
    const state: any = global.keyboard.state;
    const grid = global.maps[global.activeMap].grid;

    if (state.up) {
      const probeY: number = actor.y - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY });
      actor.y = probeY - result.top;
      actor.direction = DirectionTypes.Up;
      this.checkVerticalBand(probeY, actor, grid, result);
    }
    if (state.down) {
      const probeY: number = actor.y + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY });
      actor.y = probeY + result.bottom;
      actor.direction = DirectionTypes.Down;
      this.checkVerticalBand(probeY, actor, grid, result);
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y });
      actor.x = probeX - result.left;
      actor.direction = DirectionTypes.Left;
      this.checkHorizontalBand(probeX, actor, grid, result);
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y });
      actor.x = probeX + result.right;
      actor.direction = DirectionTypes.Up;
      this.checkHorizontalBand(probeX, actor, grid, result);
    }
  }

  private checkVerticalBand(probeY, actor, grid, result) {
    console.log(result);
    const left = Math.abs(result.left);
    const right = Math.abs(result.right);
    if (right > 0 && right < this.bandMargin) {
      actor.x = actor.x - right;
      actor.y = probeY;
    } else if (left > 0 && left < this.bandMargin) {
      actor.x = actor.x + left;
      actor.y = probeY;
    }
  }

  private checkHorizontalBand(probeX, actor, grid, result) {
    console.log(result);
    const top = Math.abs(result.top);
    const bottom = Math.abs(result.bottom);
    if (top > 0 && top < this.bandMargin) {
      actor.y = actor.y + top;
      actor.x = probeX;
    } else if (bottom > 0 && bottom < this.bandMargin) {
      actor.y = actor.y - bottom;
      actor.x = probeX;
    }
  }
}
