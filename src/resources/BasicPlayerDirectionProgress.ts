import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import { DirectionTypes } from './DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;
const defaultBandMargin = 4;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };

export default class BasicPlayerDirectionProgress implements IProgress {
  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond,
    private bandMargin = defaultBandMargin
  ) {}

  public progress(actor: Actor): void {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const grid = global.maps[global.activeMap].grid;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, unit - 1);
    const state: any = global.keyboard.state;
    const gridX: number = Math.floor(actor.x / unit);
    const gridY: number = Math.floor(actor.y / unit);

    const animationKey: number = actor.state.animationKey;
    const animation: any = global.animations.data[animationKey];
    const boundingBox: any = 'boundingBox' in animation && animation.boundingBox ? animation.boundingBox : defaultBoundingBox;

    const width: number = unit - (boundingBox.left + boundingBox.right);
    const height: number = unit - (boundingBox.top + boundingBox.bottom);

    const altXLeft: number = gridX * unit + halfUnit - boundingBox.left;
    const altXRight: number = (gridX + 1) * unit - halfUnit + boundingBox.right;
    const altYUp: number = gridY * unit + halfUnit - boundingBox.top;
    const altYDown: number = (gridY + 1) * unit - halfUnit + boundingBox.bottom;

    const tendencyX = actor.x - Math.floor(actor.x / unit) * unit;
    const sideX = tendencyX > halfUnit ? -1 : 1;
    const bandX =
      // Get grid pos
      ((gridX + (sideX === 1 ? 0 : 1)) * unit) +
      // Center the grid
      halfUnit * sideX +
      // Properly correct for boundingBox
      (sideX === -1 ? boundingBox.right : boundingBox.left * -1);

    const tendencyY = actor.y - Math.floor(actor.y / unit) * unit;
    const sideY = tendencyY > halfUnit ? -1 : 1;
    const bandY =
      // Get grid pos
      ((gridY + (sideY === 1 ? 0 : 1)) * unit) +
      // Center the grid
      halfUnit * sideY +
      // Properly correct for boundingBox
      (sideY === -1 ? boundingBox.bottom : boundingBox.top);

    // First, make sure we are not stuck in a wall
    const preCheck = grid.checkGrid(actor.x + boundingBox.left, actor.y + boundingBox.top, width, height, 0, true)
    if (preCheck.left && !preCheck.right) actor.x = altXRight;
    if (!preCheck.left && preCheck.right) actor.x = altXLeft;
    if (preCheck.up && !preCheck.down) actor.y = altYDown;
    if (!preCheck.up && preCheck.down) actor.y = altYUp;

    // Then process any movements
    if (state.up) {
      const probeY: number = actor.y - movement;
      const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.y -= movement;
      else if (checkGridBand.all) {
        actor.y -= movement + this.bandMargin;
        actor.x = bandX;
      } else {
        actor.y = altYUp;
      }
      actor.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeY: number = actor.y + movement;
      const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.y += movement;
      else if (checkGridBand.all) {
        actor.y += movement + this.bandMargin;
        actor.x = bandX;
      } else {
        actor.y = altYDown;
      }
      actor.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement;
      const checkGrid: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.x -= movement;
      else if (checkGridBand.all) {
        actor.x -= movement + this.bandMargin;
        actor.y = bandY;
      } else {
        actor.x = altXLeft;
      }
      actor.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement;
      const checkGrid: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.x += movement;
      else if (checkGridBand.all) {
        actor.x += movement + this.bandMargin;
        actor.y = bandY;
      } else {
        actor.x = altXRight;
      }
      actor.direction = DirectionTypes.Right;
    }
  }
}
