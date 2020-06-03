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
    private jumpStart: number = 0,
    private fallStart: number = 0,
    private canJump: boolean = true
  ) {}

  public progress(actor: Actor): void {
    const state: any = global.keyboard.state;

    if (!state.up) this.canJump = true;
    this.moveHorizontal(actor);

    switch(actor.condition) {
      case ConditionTypes.Standing:
        // Depending on input change, we can walk or jump
        if (state.left || state.right) {
          actor.condition = ConditionTypes.Walking;
        }
        if (state.up && this.canJump) {
          actor.condition = ConditionTypes.Jumping;
        }
        break;
      case ConditionTypes.Walking:
        // Depending on input change, we can stand or jump
        if (!state.left && !state.right) {
          actor.condition = ConditionTypes.Standing;
        }
        if (state.up && this.canJump) {
          actor.condition = ConditionTypes.Jumping;
        }
        if (this.canFall(actor)) {
          actor.condition = ConditionTypes.Falling;
        }
        break;
      case ConditionTypes.Jumping:
        // Depending on circumstances, we can fall
        if (!this.jumpStart) {
          this.jumpStart = global.clock.getTime();
        }
        const isDoneJumping = global.clock.getTime() - this.jumpStart >= jumpDuration;
        if (!state.up || isDoneJumping || !this.handleJump(actor)) {
          this.jumpStart = 0;
          actor.condition = ConditionTypes.Falling;
        }
        break;
      case ConditionTypes.Falling:
        if (!this.fallStart) {
          this.fallStart = global.clock.getTime();
        }
        if (!this.canFall(actor)) {
          this.fallStart = 0;
          actor.condition = ConditionTypes.Standing;
        } else {
          this.handleFall(actor);
        }
        break;
      default:
        throw new Error("Unknown condition type");
    }
  }

  private handleJump(actor): boolean {
    this.canJump = false;
    const {
      unit, grid, elapsedTime, halfUnit, boundingBox, width, height
    } = this.getShared(actor);
    const elapsedJumpTime = global.clock.getTime() - this.jumpStart;
    const jumpStepIndex = Math.floor(jumpStep * elapsedJumpTime) > jumpValues.length - 1 ? jumpValues.length - 1 : Math.floor(jumpStep * elapsedJumpTime);
    const jumpMovement = this.pixelsPerSecond * jumpValues[jumpStepIndex] * elapsedTime / 1000;
    const gridY: number = Math.floor(actor.y / unit);
    const probeY: number = actor.y - jumpMovement;
    const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
    const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);

    if (checkGrid.all) actor.y -= jumpMovement;
    else if (checkGridBand.all) {
      actor.y -= jumpMovement + this.bandMargin;
    } else {
      const altYUp: number = (gridY * global.config.unit) + halfUnit - boundingBox.top;
      actor.y = altYUp;
      return false;
    }
    return true;
  }

  private canFall(actor) : boolean {
    const {
      unit, grid, boundingBox, width, height
    } = this.getShared(actor);
    const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, actor.y + boundingBox.top, width, height + 1, 0, true);
    const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, actor.y + boundingBox.top, width, height + 1, this.bandMargin, true);

    if (!checkGrid.all && !checkGridBand.all) {
      return false;
    }
    return true;
  }

  private handleFall(actor): boolean {
    const {
      unit, grid, elapsedTime, halfUnit, boundingBox, width, height
    } = this.getShared(actor);
    const elapsedFallTime = global.clock.getTime() - this.fallStart; // default to first index
    const fallStepIndex = Math.floor(fallStep * elapsedFallTime) > fallValues.length - 1 ? fallValues.length - 1 : Math.floor(fallStep * elapsedFallTime);
    const fallMovement = this.pixelsPerSecond * fallValues[fallStepIndex] * elapsedTime / 1000;
    const gridY: number = Math.floor(actor.y / unit);
    const probeY: number = actor.y + fallMovement;
    const checkGrid: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, 0, true);
    const checkGridBand: any = grid.checkGrid(actor.x + boundingBox.left, probeY + boundingBox.top, width, height, this.bandMargin, true);

    if (checkGrid.all) {
      actor.y += fallMovement;
    }
    else if (checkGridBand.all) {
      actor.y += fallMovement + this.bandMargin;
    } else {
      const altYDown: number = ((gridY + 1) * unit) - halfUnit + boundingBox.bottom;
      actor.y = altYDown;
      this.fallStart = 0;
      actor.condition = ConditionTypes.Standing;
      return false;
    }
    return true;
  }

  private moveHorizontal(actor) {
    const {
      unit, state, grid, halfUnit, movement, boundingBox, width, height
    } = this.getShared(actor);
    const gridX: number = Math.floor(actor.x / unit);

    if (state.left) {
      const probeX: number = actor.x - movement;
      const checkGrid: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, 0, true);
      const checkGridBand: any = grid.checkGrid(probeX + boundingBox.left, actor.y + boundingBox.top, width, height, this.bandMargin, true);
      if (checkGrid.all) actor.x -= movement;
      else if (checkGridBand.all) {
        actor.x -= movement + this.bandMargin;
      } else {
        const altXLeft: number = (gridX * unit) + halfUnit - boundingBox.left;
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
      } else {
        const altXRight: number = ((gridX + 1) * unit) - halfUnit + boundingBox.right;
        actor.x = altXRight;
      }
      actor.direction = DirectionTypes.Right;
    }
  }

  private getShared(actor) {
    const unit = global.config.unit;
    const state = global.keyboard.state;
    const grid = global.maps[global.activeMap].grid;
    const elapsedTime: number = global.clock.elapsedTime;
    const halfUnit = unit / 2;
    const movement: number = Math.min(this.pixelsPerSecond * elapsedTime / 1000, unit - 1);
    const boundingBox: any = this.getBoundingBox(actor);
    const width: number = unit - (boundingBox.left + boundingBox.right);
    const height: number = unit - (boundingBox.top + boundingBox.bottom);
    return {
      unit, state, grid, elapsedTime, halfUnit, movement, boundingBox, width, height
    };
  }

  private getBoundingBox(actor) {
    const animationKey: number = actor.state.animationKey;
    const animation: any = global.animations.data[animationKey];
    return 'boundingBox' in animation && animation.boundingBox ? animation.boundingBox : defaultBoundingBox;
  }
}
