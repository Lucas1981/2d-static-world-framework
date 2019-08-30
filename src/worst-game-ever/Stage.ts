import { GameState } from '../lib/GameState';
import { IStage } from '../lib/IStage';
import TextWriter from '../resources/TextWriter';
import global from '../lib/Global';

export default class Stage implements IStage {
  constructor() {}

  public checkStage() {
    let ducks = this.getNumberOfDucksLeft();

    if(ducks === 0) {
      global.gameState = GameState.StageCompleted;
      global.sound.play('stage-clear');
    } else {
      this.drawScore(ducks);
    }
  }

  public handleCollision(colliders: any[], actor: any) {
    const collider: any = colliders[0]; // We only need the first collider

    if (actor.element.isActive()) {
      // If the collider can't move and the actor can move and is benevolent, then the player hit a coin
      if (!collider.element.isActive() && actor.element.isActive() && actor.element.isBenevolent()) {
        // So remove the coin
        collider.element.die();
        if (this.getNumberOfDucksLeft() !== 1) global.sound.play('got-coin');
      }

      // If we can move and are benevolent, we are the player
      if (collider.element.isActive() && collider.element.isBenevolent()) {
        // Which means an enemy hit us, so we're dead
        global.gameState = GameState.Dead;
        global.sound.play('dead');
      }
    }
  }

  private getNumberOfDucksLeft(): number {
    let ducks = 0;
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      if (!actor.element.isMovable() && actor.element.isBenevolent()) ducks++;
    }
    return ducks;
  }

  private drawScore(ducks) {
    TextWriter.writeStatusBar(`Duckies: ${ducks}`, 'right');
  }
}
