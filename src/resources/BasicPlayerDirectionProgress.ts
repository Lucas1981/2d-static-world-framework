import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import { DirectionTypes } from './DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;
const defaultBandMargin = 7;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };

export default class BasicPlayerDirectionProgress implements IProgress {
  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond,
    private bandMargin = defaultBandMargin
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

    const normalizedActorX = actor.x - halfUnit;
    const tendencyX = normalizedActorX - ((Math.floor(normalizedActorX) / global.config.unit) * global.config.unit);
    const sideX = tendencyX > 32 ? -1 : 1;

    const normalizedActorY = actor.y - halfUnit;
    const tendencyY = normalizedActorY - ((Math.floor(normalizedActorY) / global.config.unit) * global.config.unit);
    const sideY = tendencyY > 32 ? -1 : 1;
    const animationKey = actor.state.animationKey;
    const animation = global.animations.data[animationKey]
    const boundingBox = 'boundingBox' in animation ? animation.boundingBox : defaultBoundingBox;

    if (state.up) {
      const probeX: number = actor.x;
      const probeY: number = actor.y - movement + boundingBox.top;
      if (grid.checkGrid(probeX, probeY)) actor.y -= movement;
      else if (grid.checkBandGrid(probeX, probeY, this.bandMargin)) {
        actor.y -= movement + this.bandMargin;
        actor.x = ((gridX + (sideX === 1 ? 0 : 1)) * global.config.unit) + (halfUnit * sideX);
      } else actor.y = (gridY * global.config.unit) + halfUnit - boundingBox.top;
      actor.direction = DirectionTypes.Up;
    }
    if (state.down) {
      const probeX: number = actor.x;
      const probeY: number = actor.y + movement - boundingBox.bottom;
      if (grid.checkGrid(probeX, probeY)) actor.y += movement;
      else if (grid.checkBandGrid(probeX, probeY, this.bandMargin)) {
        actor.y += movement + this.bandMargin;
        actor.x = ((gridX + (sideX === 1 ? 0 : 1)) * global.config.unit) + (halfUnit * sideX);
      } else actor.y = ((gridY + 1) * global.config.unit) - halfUnit + boundingBox.bottom;
      actor.direction = DirectionTypes.Down;
    }
    if (state.left) {
      const probeX: number = actor.x - movement + boundingBox.left;
      const probeY: number = actor.y;
      if (grid.checkGrid(probeX, probeY)) actor.x -= movement;
      else if (grid.checkBandGrid(probeX, probeY, this.bandMargin)) {
        actor.x -= movement + this.bandMargin;
        actor.y = ((gridY + (sideY === 1 ? 0 : 1)) * global.config.unit) + (halfUnit * sideY);
      }
      else actor.x = (gridX * global.config.unit) + halfUnit - boundingBox.left;
      actor.direction = DirectionTypes.Left;
    }
    if (state.right) {
      const probeX: number = actor.x + movement - boundingBox.right;
      const probeY: number = actor.y;
      if (grid.checkGrid(probeX, probeY)) actor.x += movement;
      else if (grid.checkBandGrid(probeX, probeY, this.bandMargin)) {
        actor.x += movement + this.bandMargin;
        actor.y = ((gridY + (sideY === 1 ? 0 : 1)) * global.config.unit) + (halfUnit * sideY);
      }
      else actor.x = ((gridX + 1) * global.config.unit) - halfUnit + boundingBox.right;
      actor.direction = DirectionTypes.Right;
    }
  }
}
