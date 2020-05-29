import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import { ConditionTypes } from './ConditionTypes';
import { DirectionTypes } from './DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;
const defaultBandMargin = 4;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };
const jumpValues = [4, 3, 2, 1].map(val => val * .9);
const fallValues = [1, 2, 3, 4].map(val => val * .9);
const jumpDuration = 320;
const fallDuration = 320;
const jumpStep = jumpValues.length / jumpDuration;
const fallStep = fallValues.length / fallDuration;

export default class BasicPlatformPlayerDirectionProgress implements IProgress {
  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond,
    private bandMargin = defaultBandMargin,
    private isJumping: boolean = false,
    private isFalling: boolean = false,
    private jumpStart: number = 0,
    private fallStart: number = 0,
    private canJump: boolean = true
  ) {}

  public progress(actor: Actor): void {
    const halfUnit = global.config.unit / 2;
    const elapsedTime: number = global.clock.elapsedTime;
    // Limit the possible movement to a unit - 1 max
    const grid = global.maps[global.activeMap].grid;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, global.config.unit - 1);
    const state: any = global.keyboard.state;
    const gridX: number = Math.floor(actor.x / global.config.unit);
    const gridY: number = Math.floor(actor.y / global.config.unit);

    const animationKey: number = actor.state.animationKey;
    const animation: any = global.animations.data[animationKey];
    const boundingBox: any = 'boundingBox' in animation && animation.boundingBox ? animation.boundingBox : defaultBoundingBox;

    const width: number = global.config.unit - (boundingBox.left + boundingBox.right);
    const height: number = global.config.unit - (boundingBox.top + boundingBox.bottom);

    const altXLeft: number = (gridX * global.config.unit) + halfUnit - boundingBox.left;
    const altXRight: number = ((gridX + 1) * global.config.unit) - halfUnit + boundingBox.right;
    const altYUp: number = (gridY * global.config.unit) + halfUnit - boundingBox.top;
    const altYDown: number = ((gridY + 1) * global.config.unit) - halfUnit + boundingBox.bottom;

    const tendencyX = actor.x - (Math.floor(actor.x / global.config.unit) * global.config.unit);
    const sideX = tendencyX > halfUnit ? -1 : 1;
    const bandX =
      // Get grid pos
      ((gridX + (sideX === 1 ? 0 : 1)) * global.config.unit) +
      // Center the grid
      (halfUnit * sideX) +
      // Properly correct for boundingBox
      (sideX === -1 ? boundingBox.right : boundingBox.left * -1);

    const tendencyY = actor.y - (Math.floor(actor.y / global.config.unit) * global.config.unit);
    const sideY = tendencyY > halfUnit ? -1 : 1;
    const bandY =
      // Get grid pos
      ((gridY + (sideY === 1 ? 0 : 1)) * global.config.unit) +
      // Center the grid
      (halfUnit * sideY) +
      // Properly correct for boundingBox
      (sideY === -1 ? boundingBox.bottom : boundingBox.top);

    let isFalling = false;

    // First, make sure we are not stuck in a wall
    const preCheck = grid.checkGrid(actor.x + boundingBox.left, actor.y + boundingBox.top, width, height, 0, true)
    if (preCheck.left && !preCheck.right) actor.x = altXRight;
    if (!preCheck.left && preCheck.right) actor.x = altXLeft;
    if (preCheck.up && !preCheck.down) actor.y = altYDown;
    if (!preCheck.up && preCheck.down) actor.y = altYUp;

    // Then process any movements

    // Are we falling ?
    if (!state.up || (global.clock.getTime() - this.jumpStart > jumpDuration)){
      this.isJumping = false;
    }

    if (!this.isJumping) {
      const elapsedFallTime = this.isFalling ? global.clock.getTime() - this.fallStart : 0; // default to first index
      const fallStepIndex = Math.floor(fallStep * elapsedFallTime) > fallValues.length - 1 ? fallValues.length - 1 : Math.floor(fallStep * elapsedFallTime);
      const fallMovement = this.pixelsPerSecond * fallValues[fallStepIndex] * elapsedTime / 1000;

      const probeY: number = actor.y + fallMovement;
      const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) {
        this.handleFalling(actor);
        actor.y += fallMovement;
      }
      else if (checkGridBand.all) {
        this.handleFalling(actor);
        actor.y += fallMovement + this.bandMargin;
        actor.x = bandX;
      } else {
        this.isFalling = false;
        actor.y = altYDown;
      }
    }

    if (state.up) {
      if (this.canJump && !this.isJumping && !this.isFalling) {
        this.jumpStart = global.clock.getTime();
        this.isJumping = true;
        this.canJump = false;
      }
    }

    if (!state.up) { this.canJump = true; }

    if (state.up && this.isJumping) {
      const elapsedJumptTime = global.clock.getTime() - this.jumpStart;
      const jumpStepIndex = Math.floor(jumpStep * elapsedJumptTime) > jumpValues.length - 1 ? jumpValues.length - 1 : Math.floor(jumpStep * elapsedJumptTime);
      const jumpMovement = this.pixelsPerSecond * jumpValues[jumpStepIndex] * elapsedTime / 1000;
      const probeY: number = actor.y - jumpMovement;

      const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.y -= jumpMovement;
      else if (checkGridBand.all) {
        this.isJumping = false;
        actor.y -= jumpMovement + this.bandMargin;
        actor.x = bandX;
      } else {
        this.isJumping = false;
        actor.y = altYUp;
      }
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

  private handleFalling(actor) {
    if (!this.isFalling) {
      this.isFalling = true;
      this.fallStart = global.clock.getTime();
      actor.condition = ConditionTypes.Falling;
    }
  }
}
