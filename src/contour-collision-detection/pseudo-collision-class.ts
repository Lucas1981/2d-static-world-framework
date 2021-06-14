import Actor from '../lib/actor/Actor';
import global from '../lib/Global';

export default class PseudoCollisionClass {
  constructor() {}

  static determineCollision(
    actor: Actor,
    horizontalDirection: Number,
    verticalDirection: Number
  ): void {
    // Somehow calculate the destination we want to arrive at
    const finalDestination = this.calculateFinalDestination(actor);

    // Somehow calculate the horizontal grid units in between
    const horizontalGridUnitsInBetween = this.calculateHorizontalGriUnitsInBetween(actor, finalDestination);
    // Go over all the horizintal grid units in between (including the one you start on)
    for (let i = 0; i < horizontalGridUnitsInBetween; i++) {
      // Has an overlap taken place?
      if (scanForCollision(actor, actor.gridX + i * horizontalDirection, actor.gridY)) {
          // If so, then position the actor exactly next to the grid unit where it allows
          actor.positionNextToGridUnit(actor.gridX + i * horizontalDirection, actor.gridY);
      }
    }

    // Somehow calculate the vertical grid units in between
    const verticalGridUnitsInBetween = this.calculateVerticalGriUnitsInBetween(actor, finalDestination);
    // Go over all the vertical grid units in between (including the one you start on)
    for (let i = 0; i < verticalGridUnitsInBetween; i++) {
      // Has an overlap taken place?
      if (scanForCollision(actor, actor.gridX, actor.gridY + i * verticalDirection)) {
        actor.positionNextToGridUnit(actor.gridX, actor.gridY + i * verticalDirection);
      }
    }
  }

  calculateFinalDestination(actor: Actor) {

  }

  calculateHorizontalGriUnitsInBetween(actor: Actor, finalDestination: any) {

  }

  calculateVerticalGriUnitsInBetween(actor: Actor, finalDestination: any) {

  }
}
