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

    // const now = new Date();
    // if (+now - +this.start > 2000) {
    //   console.log('Applying time based change');
    //   const probeX: number = actor.x + 70;
    //   console.log(actor.x);
    //   console.log(probeX)
    //   const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y }, 0);
    //   console.log(`Received: ${JSON.stringify(result)}`);
    //   actor.x += result.x;
    //   actor.y += result.y;
    //   actor.direction = DirectionTypes.Left;
    //   this.start = new Date('01-01-2040');
    // }
    if (state.up) {
      const probeY: number = actor.y - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY }, defaultBandMargin);
      actor.y += result.y;
      actor.x += result.x;
      actor.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeY: number = actor.y + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: actor.x, y: probeY }, defaultBandMargin);
      actor.y += result.y;
      actor.x += result.x;
      actor.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y }, defaultBandMargin);
      actor.x += result.x;
      actor.y += result.y;
      actor.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const result = ContourCollision.correctActor(grid, actor, { x: probeX, y: actor.y }, defaultBandMargin);
      actor.x += result.x;
      actor.y += result.y;
      actor.direction = DirectionTypes.Right;
    }
  }
}
