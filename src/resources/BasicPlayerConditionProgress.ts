import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import { ConditionTypes } from './ConditionTypes';
import { DirectionTypes } from './DirectionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;

export default class BasicPlayerConditionProgress implements IProgress {

  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond
  ) {}

  public progress(actor: Actor): void {

    actor.condition = ConditionTypes.Standing; // Assume we are not moving

    if (state.up || state.down || state.left || state.right) {
      actor.condition = ConditionTypes.Walking;
    }
  }
}
