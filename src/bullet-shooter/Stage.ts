import { IStage } from '../lib/IStage';
import { GameState } from '../lib/GameState';
import global from '../lib/Global';

export default class Stage implements IStage {
  constructor() {}

  public checkStage() {
    let counter = 0;
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
        if (!actor.element.isBenevolent() && actor.element.isVulnerable()) {
          counter++;
        }
    }
    // If all enemies are killed, the stage is completed
    if (counter === 0) {
      global.gameState = GameState.StageCompleted;
    }
  }

  public handleCollision(colliders, actor) {
    for (let collider of colliders) {
      if (
        // Is this the player?
        collider.element.isBenevolent() &&
        !collider.element.isHarmful() &&
        // Is this an enemy or an enemy bullet?
        !actor.element.isBenevolent() &&
        actor.element.isHarmful()
      ) {
        // Then you're dead
        global.gameState = GameState.Dead;
      }

      if (
        // Is this an enemy?
        !collider.element.isBenevolent() &&
        collider.element.isVulnerable() &&
        // Is it hit by a player's bullet?
        actor.element.isBenevolent() &&
        actor.element.isHarmful()
      ) {
        // Then kill the enemy
        collider.element.die()
      }
    }
  }
}
