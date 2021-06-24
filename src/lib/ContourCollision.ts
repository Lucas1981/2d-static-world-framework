import Grid from './Grid';
import Actor from './actor/Actor';
import global from './Global';

const debug = false;

export default class ContourCollision {
  constructor() {}

  public static correctActor(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number = 0): any {
    const direction = actor.x - nextPosition.x === 0 ? 'vertical' : 'horizontal';

    switch (direction) {
      case 'vertical':
        return this.correctActorVertical(grid, actor, nextPosition, bandMargin);
      case 'horizontal':
        return this.correctActorHorizontal(grid, actor, nextPosition, bandMargin);
      default:
        throw new Error('Unknown direction');
    }
  }

  public static correctActorVertical(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const delta =  nextPosition.y - actor.y;
    const direction = delta < 1 ? -1 : 1;
    const correctedUnit = unit * direction;
    const firstPosition = delta % unit;
    let x = 0;
    let y = firstPosition;
    while(Math.abs(y) <= Math.abs(delta)) {
      const change = this.processTile(grid, actor, { x: x + actor.x, y: y + actor.y });
      // Did we hit something?
      if (change.top !== 0 || change.bottom !== 0) {
        const left = Math.abs(change.left);
        const right = Math.abs(change.right);
        // Are we within the left range of the allowed bandwidth?
        if (left > 0 && left < bandMargin) {
          // Then adjust the x and keep going
          x += left;
        // Are we within the right range of the allowed bandwidth?
        } else if (right > 0 && left < bandMargin) {
          // Then adjust the x and keep going
          x -= right;
        } else {
          // If not, return the x with the difference
          const correction = direction * (change.top || change.bottom);
          y += correction;
          return { x, y };
        }
      }
      // Otherwise, bank the distance and move to the next tile
      y += correctedUnit
    }

    // We didn't hit anything, which means we are one tile length over, so correct and return
    y -= correctedUnit;
    return { x, y };
  }

  public static correctActorHorizontal(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number) {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const delta =  nextPosition.x - actor.x;
    const direction = delta < 1 ? -1 : 1;
    const correctedUnit = unit * direction;
    const firstPosition = delta % unit;
    let y = 0;
    let x = firstPosition;
    while(Math.abs(x) <= Math.abs(delta)) {
      const change = this.processTile(grid, actor, { x: x + actor.x, y: actor.y });
      const top = Math.abs(change.top);
      const bottom = Math.abs(change.bottom);
      // Did we hit something?
      if (change.left !== 0 || change.right !== 0) {
        // Are we within the top range of the allowed bandwidth?
        if (top > 0 && top < bandMargin) {
          // Then adjust the y and keep going
          y += top;
        // Are we within the left range of the allowed bandwidth?
        } else if (bottom > 0 && bottom < bandMargin) {
          // Then adjust the y and keep going
          y -= bottom;
        } else {
          // If not, return the x with the difference
          const correction = direction * (change.left || change.right);
          x += correction;
          return { x, y };
        }
      }
      // Otherwise, bank the distance and move to the next tile
      x += correctedUnit
    }

    // We didn't hit anything, which means we are one tile length over, so correct and return
    x -= correctedUnit;
    return { x, y };
  }

  public static processTile(grid: Grid, actor: Actor, nextPosition: any) {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const result = {
      top: 0, bottom: 0, left: 0, right: 0
    };

    // We must determine what four tiles we will be auditing. We can use the methods on the Grid class for that
    const probes = grid.getProbes(nextPosition.x, nextPosition.y, unit, unit);
    const animationIndices = {
      topLeft: grid.getAnimation(probes.left, probes.top),
      topRight: grid.getAnimation(probes.right, probes.top),
      bottomLeft: grid.getAnimation(probes.left, probes.bottom),
      bottomRight: grid.getAnimation(probes.right, probes.bottom)
    };

    const tiles = {
      topLeft: animationIndices.topLeft !== null ? this.getCurrentFrame(animationIndices.topLeft).contour : { right: new Array(unit).fill(-1), bottom: new Array(unit).fill(-1) },
      topRight: animationIndices.topRight !== null ? this.getCurrentFrame(animationIndices.topRight).contour : { left: new Array(unit).fill(unit), bottom: new Array(unit).fill(-1) },
      bottomLeft: animationIndices.bottomLeft !== null ? this.getCurrentFrame(animationIndices.bottomLeft).contour : { right: new Array(unit).fill(-1), top: new Array(unit).fill(unit) },
      bottomRight: animationIndices.bottomRight !== null ? this.getCurrentFrame(animationIndices.bottomRight).contour : { left: new Array(unit).fill(unit), top: new Array(unit).fill(unit) }
    };

    // Smash together all four cornering tiles so we have all strips in place to audit, based on actor position and size
    const contours = {
      right: [...tiles.topLeft.right, ...tiles.bottomLeft.right],
      bottom: [...tiles.topLeft.bottom, ...tiles.topRight.bottom],
      left: [...tiles.topRight.left, ...tiles.bottomRight.left],
      top: [...tiles.bottomLeft.top, ...tiles.bottomRight.top]
    }

    // We will need to know the position of the player relative to the four tiles
    const offsetX = (parseInt(nextPosition.x) + halfUnit) % unit;
    const offsetY = (parseInt(nextPosition.y) + halfUnit) % unit;
    const actorFrame = actor.getCurrentFrame();

    // Check x
    for (let row = 0; row < actorFrame.height; row++) {
      const deltaLeft = (unit - (contours.right[row + offsetY] + 1)) + actorFrame.contour.left[row] - (unit - offsetX);
      const deltaRight = (unit - (actorFrame.contour.right[row] + 1)) + contours.left[row + offsetY] - offsetX;
      if (debug) {
        this.plotPixel(actor.x + (unit / 2) + actorFrame.contour.left[row], actor.y + (unit / 2) + row, 'orange');
        this.plotPixel(actor.x + (unit / 2) + actorFrame.contour.right[row], actor.y + (unit / 2) + row, 'red');
      }
      if (result.left > deltaLeft) {
        result.left = deltaLeft;
      }
      if (result.right > deltaRight) {
        result.right = deltaRight;
      }
    }

    // Check y
    for (let column = 0; column < actorFrame.width; column++) {
      const deltaTop = (unit - (contours.bottom[column + offsetX] + 1)) + actorFrame.contour.top[column] - (unit - offsetY);
      const deltaBottom = (unit - (actorFrame.contour.bottom[column] + 1)) + contours.top[column + offsetX] - offsetY;
      if (debug) {
        this.plotPixel(actor.x + (unit / 2) + column, actor.y + (unit / 2) + actorFrame.contour.top[column], 'purple');
        this.plotPixel(actor.x + (unit / 2) + column, actor.y + (unit / 2) + actorFrame.contour.bottom[column], 'brown');
      }
      if (result.top > deltaTop) {
        result.top = deltaTop;
      }
      if (result.bottom > deltaBottom) {
        result.bottom = deltaBottom;
      }
    }
    return result;
  }

  private static getCurrentFrame(index) {
    return global.animations.data[index].getCurrentFrame(global.clock.elapsedTime)
  }

  private static playerToGrid(value: number): number {
    return Math.floor(value / global.config.unit);
  }

  private static plotPixel(x, y, color) {
    const ctx = global.canvas.getContext();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x, y, 1, 1);
    ctx.fill();
    ctx.closePath();
  }
}
