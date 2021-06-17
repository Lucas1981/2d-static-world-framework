import Grid from './Grid';
import Actor from './actor/Actor';
import global from './Global';

export default class ContourCollision {
  constructor() {}

  public static correctActor(grid: Grid, actor: Actor, nextPosition: any): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;

    // Ultimately, I want to do this for the final position but also for all tiles that might occur in between
    // const tiles = Math.floor(Math.abs(actor.x - nextPosition.x) / unit); // Calculate the tiles in between start and final position of actor
    // for (let tile = 0; tile < tiles + 1; tile++) {

    // We must determine what four tiles we will be auditing. We can use the methods on the Grid class for that
    const probes = grid.getProbes(nextPosition.x, nextPosition.y, unit, unit);
    const animationIndices = {
      topLeft: grid.getAnimation(probes.left, probes.top),
      topRight: grid.getAnimation(probes.right, probes.top),
      bottomLeft: grid.getAnimation(probes.left, probes.bottom),
      bottomRight: grid.getAnimation(probes.right, probes.bottom)
    }

    const tiles = {
      topLeft: animationIndices.topLeft !== null ? this.getCurrentFrame(animationIndices.topLeft).contour : { right: new Array(unit).fill(0), bottom: new Array(unit).fill(0) },
      topRight: animationIndices.topRight !== null ? this.getCurrentFrame(animationIndices.topRight).contour : { left: new Array(unit).fill(unit), bottom: new Array(unit).fill(0) },
      bottomLeft: animationIndices.bottomLeft !== null ? this.getCurrentFrame(animationIndices.bottomLeft).contour : { right: new Array(unit).fill(0), top: new Array(unit).fill(unit) },
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
    const offsetX = (parseInt(nextPosition.x) - halfUnit) % unit;
    const offsetY = (parseInt(nextPosition.y) - halfUnit) % unit;

    // With all the ingredients we need, we can start the auditing.
    const result = {
      top: 0, bottom: 0, left: 0, right: 0
    };
    const actorFrame = actor.getCurrentFrame();

    // Check x
    for (let row = 0; row < actorFrame.height; row++) {
      const deltaLeft = (unit - contours.right[row + offsetY]) + actorFrame.contour.left[row] - (unit - offsetX);
      const deltaRight = (unit - actorFrame.contour.right[row]) + contours.left[row + offsetY] - offsetX;
      if (result.left > deltaLeft) {
        result.left = deltaLeft;
      }
      if (result.right > deltaRight) {
        result.right = deltaRight;
      }
    }

    // Check y
    for (let column = 0; column < actorFrame.width; column++) {
      const deltaTop = (unit - contours.bottom[column + offsetX]) + actorFrame.contour.top[column] - (unit - offsetY);
      const deltaBottom = (unit - actorFrame.contour.bottom[column]) + contours.top[column + offsetX] - offsetY;
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
}
