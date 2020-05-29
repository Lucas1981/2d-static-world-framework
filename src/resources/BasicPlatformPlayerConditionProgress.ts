import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import { ConditionTypes } from './ConditionTypes';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

const defaultPixelsPerSecond = 150;

export default class BasicPlatformPlayerConditionProgress implements IProgress {

  constructor(
    private pixelsPerSecond = defaultPixelsPerSecond
  ) {}

  public progress(actor: Actor): void {
    const state = global.keyboard.state;

    if (actor.condition !== ConditionTypes.Falling) { // This one is set in the Directions, because we cannot control or probe that state
      actor.condition = ConditionTypes.Standing; // Assume we are not moving
    }

    if (state.left || state.right) {
      actor.condition = ConditionTypes.Walking;
    }

    if (state.up) {
      actor.condition = ConditionTypes.Jumping;
    }
  }
}
