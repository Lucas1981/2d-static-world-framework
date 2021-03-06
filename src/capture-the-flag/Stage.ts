import global from '../lib/Global';
import { GameState } from '../lib/GameState';
import { IStage } from '../lib/IStage';

export default class Stage implements IStage {
  constructor() {}

  public checkStage() {
    // Calculate the total number of coins left
    let remainingCoins = 0;
    for (let coinActor = global.maps[global.activeMap].actors.first(); coinActor !== null; coinActor = coinActor.next) {
      if (!coinActor.element.isActive()) {
        remainingCoins++;
      }
    }

    // If we've got them all...
    if (remainingCoins === 0) {
      // Then this stage is completed
      global.gameState = GameState.StageCompleted;
    }
  }

  public handleCollision(colliders, actor) {
    const collider = colliders[0]; // We only need the first collider

    if (actor.element.isActive()) {
      // If the collider can't move and the actor can move and is benevolent, then the player hit a coin
      if (!collider.element.isActive() && actor.element.isActive() && actor.element.isBenevolent()) {
        // So remove the coin
        collider.element.die();
      }

      // If we can move and are benevolent, we are the player
      if (collider.element.isActive() && collider.element.isBenevolent()) {
        // Which means an enemy hit us, so we're dead
        global.gameState = GameState.Dead;
      }
    }
  }
}
