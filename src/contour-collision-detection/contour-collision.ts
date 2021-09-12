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
      const { margins, collides, x } = this.checkLeft(grid, actor, nextPosition, bandMargin);
      if (collides) {
        if (margins.top < bandMargin) return { y: margins.top + 1, x };
        if (margins.bottom >= unit - bandMargin) return { y: -1 * (unit - margins.bottom), x };
      }
      return { y: 0, x };
    }
    if (actor.x < nextPosition.x) {
      const { margins, collides, x } = this.checkRight(grid, actor, nextPosition, bandMargin);
      if (collides) {
        if (margins.top < bandMargin) return { y: margins.top + 1, x };
        if (margins.bottom >= unit - bandMargin) return { y: -1 * (unit - margins.bottom), x };
      }
      return { y: 0, x };
    }
    if (actor.y > nextPosition.y) {
      const { margins, collides, y } = this.checkTop(grid, actor, nextPosition, bandMargin);
      console.log(margins);
      if (collides) {
        if (margins.left < bandMargin) return { y, x: margins.left + 1};
        if (margins.right >= unit - bandMargin) return { y, x: -1 * (unit - margins.right) };
      }
      return { x: 0, y };
    }
    if (actor.y < nextPosition.y) {
      const { margins, collides, y } = this.checkBottom(grid, actor, nextPosition, bandMargin);
      if (collides) {
        if (margins.left < bandMargin) return { y, x: margins.left + 1 };
        if (margins.right >= unit - bandMargin) return { y, x: -1 * (unit - margins.right) };
      }
      return { x: 0, y };
    }
    return nextPosition;
  }

  private static checkRight(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = nextPosition.x - actor.x;
    const margins = { top: -1, bottom: unit };
    let collides = false;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorY = Math.floor(actor.y - halfUnit);
    for (let row = 0; row < actorFrame.height; row++) {
      console.log(actorFrame);
      // Make sure we are not going to probe an empty row
      if (actorFrame.contour.right[row] === -1) continue;
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
          // If we are, calculate the maximum distance we can still make on this row
          const correctedDistance = distance + (tileDomain[0] - rest);
          if (correctedDistance < finalDistance) finalDistance = correctedDistance;
          if (row > margins.top) margins.top = row;
          if (row < margins.bottom) margins.bottom = row;
          collides = true;
          break;
        }
        distance += stop - rest;
      }
    }
    return { margins, collides, x: finalDistance };
  }

  private static checkLeft(grid: Grid, actor: Actor, nextPosition: any, margin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = actor.x - nextPosition.x;
    const margins = { top: -1, bottom: unit };
    let collides = false;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorY = Math.floor(actor.y - halfUnit);
    for (let row = 0; row < actorFrame.height; row++) {
      // Make sure we are not going to probe an empty row
      if (actorFrame.contour.left[row] === unit) continue;
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
          // If we are, calculate the maximum distance we can still make on this row
          const correctedDistance = distance + (rest - tileDomain[1]);
          if (correctedDistance < finalDistance) finalDistance = correctedDistance;
          if (row > margins.top) margins.top = row;
          if (row < margins.bottom) margins.bottom = row;
          collides = true;
          break;
        }
        distance += rest - stop;
      }
    }
    return { margins, collides, x: -finalDistance };
  }

  private static checkTop(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = actor.y - nextPosition.y;
    const margins = { left: -1, right: unit };
    let collides = false;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorX = Math.floor(actor.x - halfUnit);
    for (let column = 0; column < actorFrame.width; column++) {
      if (actorFrame.contour.top[column] === unit) continue;
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
          // If we are, calculate the maximum distance we can still make on this row
          const correctedDistance = distance + (rest - tileDomain[1]);
          if (correctedDistance < finalDistance) finalDistance = correctedDistance;
          if (column > margins.left) margins.left = column;
          if (column < margins.right) margins.right = column;
          collides = true;
          break;
        }
        distance += rest - stop;
      }
    }
    return { margins, collides, y: -finalDistance };
  }

  private static checkBottom(grid: Grid, actor: Actor, nextPosition: any, bandMargin: number): any {
    const unit = global.config.unit;
    const halfUnit = unit / 2;
    const actorFrame = actor.getCurrentFrame();
    const delta = nextPosition.y - actor.y;
    const margins = { left: -1, right: unit };
    let collides = false;
    let finalDistance = delta; // Assume the distance can be fully traversed
    // For each row, check if the distance can be traversed
    const actorX = Math.floor(actor.x - halfUnit);
    for (let column = 0; column < actorFrame.width; column++) {
      if (actorFrame.contour.bottom[column] === -1) continue;
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
          // If we are, calculate the maximum distance we can still make on this row
          const correctedDistance = distance + (tileDomain[0] - rest);
          if (correctedDistance < finalDistance) finalDistance = correctedDistance;
          if (column > margins.left) margins.left = column;
          if (column < margins.right) margins.right = column;
          collides = true;
          break;
        }
        distance += stop - rest;
      }
    }
    return { margins, collides, y: finalDistance };
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
