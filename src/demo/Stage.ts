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
      global.sound.play('level-clear');
      global.gameState = GameState.StageCompleted;
    }
  }

  public handleCollision(collider, actor) {
    // If the collider can't move and the actor can move but can't hurt, then the player hit a coin
    if (!collider.element.isActive() && actor.element.isActive() && !actor.element.canHurt()) {
      // So remove the coin
      collider.element.die();
      global.sound.play('coin');
    }

    // If we can move but can't hurt, we are the player
    if (collider.element.isActive() && !collider.element.canHurt()) {
      // Which means an enemy hit us, so we're dead
      global.sound.play('dead');
      global.gameState = GameState.Dead;
    }
  }
}
