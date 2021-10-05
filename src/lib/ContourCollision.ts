import Grid from '../lib/Grid';
import Actor from '../lib/actor/Actor';
import global from '../lib/Global.ts';

export default class ContourCollision {
  constructor() {

  }

  public static correctActor(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number = 0): any {
    const unit = global.config.unit;

    // Determine the direction the actor is trying to go in
    if (actor.x > nextPosition.x) {
      return this.checkLeft(grid, actor, nextPosition, bandMargin);
    }
    if (actor.x < nextPosition.x) {
      return this.checkRight(grid, actor, nextPosition, bandMargin);
    }
    if (actor.y > nextPosition.y) {
      return this.checkTop(grid, actor, nextPosition, bandMargin);
    }
    if (actor.y < nextPosition.y) {
      return this.checkBottom(grid, actor, nextPosition, bandMargin);
    }

    return nextPosition;
  }

  private static checkRight(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = nextPosition.x - actor.x;
    const topLimit = actorFrame.boundingBox.top + bandMargin;
    const bottomLimit = actorFrame.boundingBox.bottom - bandMargin;
    let y = 0;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorY = Math.floor(actor.y - halfUnit);
    for (let row = actorFrame.boundingBox.top; row < actorFrame.boundingBox.bottom; row++) {
      const base = actor.x - halfUnit + actorFrame.contour.right[row] + 1;
      let distance = 0;
      // Do this for as long as the delta has not been completely checked
      while (distance < delta) {
        const tileDomain = this.getTileDomainRow(grid, base + distance, actorY, row);
        const rest = (base + distance) % unit;
        const stop = rest + (delta - distance) > unit - 1 ? unit : rest + (delta - distance);
        const actorDomain = [rest, stop];
        // Are we overlapping?
        if (tileDomain !== null && this.overlaps(actorDomain, tileDomain)) {
          if (row < topLimit) {
            y = topLimit - row;
          } else if (row > bottomLimit) {
            y = -1 * (row - bottomLimit);
          } else {
            // If we are, calculate the maximum distance we can still make on this row
            const correctedDistance = distance + (tileDomain[0] - rest);
            if (correctedDistance < finalDistance) finalDistance = correctedDistance;
            break;
          }
        }
        distance += stop - rest;
      }
    }
    return { y, x: finalDistance };
  }

  private static checkLeft(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = actor.x - nextPosition.x;
    const topLimit = actorFrame.boundingBox.top + bandMargin;
    const bottomLimit = actorFrame.boundingBox.bottom - bandMargin;
    let y = 0;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorY = Math.floor(actor.y - halfUnit);
    for (let row = actorFrame.boundingBox.top; row < actorFrame.boundingBox.bottom; row++) {
      const base = actor.x - halfUnit + actorFrame.contour.left[row] - 1;
      let distance = 0;
      // Do this for as long as the delta has not been completely checked
      while (distance < delta) {
        const tileDomain = this.getTileDomainRow(grid, base - distance, actorY, row);
        const rest = (base - distance) % unit;
        const stop = rest - (delta - distance) < 0 ? -1 : rest - (delta - distance);
        const actorDomain = [stop, rest];
        // Are we overlapping?
        if (tileDomain !== null && this.overlaps(actorDomain, tileDomain)) {
          if (row < topLimit) {
            y = topLimit - row;
          } else if (row > bottomLimit) {
            y = -1 * (row - bottomLimit);
          } else {
            // If we are, calculate the maximum distance we can still make on this row
            const correctedDistance = distance + (rest - tileDomain[1]);
            if (correctedDistance < finalDistance) finalDistance = correctedDistance;
            break;
          }
        }
        distance += rest - stop;
      }
    }
    return { y, x: -finalDistance };
  }

  private static checkTop(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = actor.y - nextPosition.y;
    const leftLimit = actorFrame.boundingBox.left + bandMargin;
    const rightLimit = actorFrame.boundingBox.right - bandMargin;
    let x = 0;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorX = Math.floor(actor.x - halfUnit);
    for (let column = actorFrame.boundingBox.left; column < actorFrame.boundingBox.right; column++) {
      const base = actor.y - halfUnit + actorFrame.contour.top[column] - 1;
      let distance = 0;
      // Do this for as long as the delta has not been completely checked
      while (distance < delta) {
        const tileDomain = this.getTileDomainColumn(grid, base + distance, actorX, column);
        const rest = (base + distance) % unit;
        const stop = rest - (delta - distance) < 0 ? -1 : rest - (delta - distance);
        const actorDomain = [stop, rest];
        // Are we overlapping?
        if (tileDomain !== null && this.overlaps(actorDomain, tileDomain)) {
          if (column < leftLimit) {
            x = leftLimit - column;
          } else if (column > rightLimit) {
            x = -1 * (column - rightLimit);
          } else {
            // If we are, calculate the maximum distance we can still make on this row
            const correctedDistance = distance + (rest - tileDomain[1]);
            if (correctedDistance < finalDistance) finalDistance = correctedDistance;
            break;
          }
        }
        distance += rest - stop;
      }
    }
    return { x, y: -finalDistance };
  }

  private static checkBottom(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = nextPosition.y - actor.y;
    const leftLimit = actorFrame.boundingBox.left + bandMargin;
    const rightLimit = actorFrame.boundingBox.right - bandMargin;
    let x = 0;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorX = Math.floor(actor.x - halfUnit);
    for (let column = actorFrame.boundingBox.left; column < actorFrame.boundingBox.right; column++) {
      const base = actor.y - halfUnit + actorFrame.contour.bottom[column] + 1;
      let distance = 0;
      // Do this for as long as the delta has not been completely checked
      while (distance < delta) {
        const tileDomain = this.getTileDomainColumn(grid, base + distance, actorX, column);
        const rest = (base + distance) % unit;
        const stop = rest + (delta - distance) > unit - 1 ? unit : rest + (delta - distance);
        const actorDomain = [rest, stop];
        // Are we overlapping?
        if (tileDomain !== null && this.overlaps(actorDomain, tileDomain)) {
          if (column < leftLimit) {
            x = leftLimit - column;
          } else if (column > rightLimit) {
            x = -1 * (column - rightLimit);
          } else {
            // If we are, calculate the maximum distance we can still make on this row
            const correctedDistance = distance + (tileDomain[0] - rest);
            if (correctedDistance < finalDistance) finalDistance = correctedDistance;
            break;
          }
        }
        distance += stop - rest;
      }
    }
    return { x, y: finalDistance };
  }

  private static getTileDomainRow(grid, start, actorY, row) {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const tileFrame = this.getTileFrame(grid, start, actorY + row);
    if (tileFrame === null) return tileFrame;
    // Determine the domain of the row of the current tile
    const { contour } = tileFrame;
    const tileRowIndex = (actorY + row) % unit;
    // Convert to a domain value
    return [contour.left[tileRowIndex], contour.right[tileRowIndex]];
  }

  private static getTileDomainColumn(grid, start, actorX, column) {
    const unit = global.config.unit;
    const tileFrame = this.getTileFrame(grid, actorX + column, start);
    if (tileFrame === null) return tileFrame;
    // Determine the domain of the column of the current tile
    const { contour } = tileFrame;
    const tileColumnIndex = (actorX + column) % unit;
    // Convert to a domain value
    return [contour.top[tileColumnIndex], contour.bottom[tileColumnIndex]];
  }

  private static overlaps(a, b) {
    return Math.max(a[0], b[0]) <= Math.min(a[1], b[1]);
  };

  private static getTileFrame(grid, x, y) {
    const unit = global.config.unit;
    const tileX = Math.floor(x / unit);
    const tileY = Math.floor(y / unit);
    const tile = grid.getTile(tileX, tileY);
    if (tile === null || tile.type === 'background') return null;
    return global.animations.data[tile.animation].getCurrentFrame(global.clock.elapsedTime);
  }
};
