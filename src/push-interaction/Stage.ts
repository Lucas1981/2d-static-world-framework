import Actor from '../lib/Actor';
import { IStage } from '../lib/IStage';
import global from '../lib/Global';

export default class Stage implements IStage {
  private secondBox;

  constructor() {}

  public checkStage() {
    this.secondBox = null;
  }

  public handleCollision(actor, collider) {
    // One final problem is if any box can move. Now, we move every box separately
    // But we don't really check if the player can move at all. It could be that the very
    // last box that we are trying to move would prove immovable. If that is the case, then
    // all other boxes need to be corrected in movement to reflect the same maximum movement.

    // Are we dealing with a box?
    if (!collider.element.isActive() && actor.element.isActive()) {
      // Let's try to move the box

      // We will need to know where the actor wants to push the box

      const deltaX = actor.element.x - collider.element.x;
      const deltaY = actor.element.y - collider.element.y;
      let direction: string = null;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        collider.element.x += (deltaX < 0 ? 1 : -1) * (global.config.unit - Math.abs(deltaX));
        direction = 'x';
      } else {
        collider.element.y += (deltaY < 0 ? 1 : -1) * (global.config.unit - Math.abs(deltaY));
        direction = 'y';
      }

      // Check if the move is legitimate
      const otherBox = this.collidesWithOtherBox(collider);

      // Did our box hit another box?
      if (otherBox !== null) {

        // Now, we need to move the box we are trying to push and the player as close to the box blocking us as possible
        if (direction === 'x') {
          collider.element.x = otherBox.x + (global.config.unit * (deltaX > 0 ? 1 : -1));
          actor.element.x = collider.element.x + (global.config.unit * (deltaX > 0 ? 1 : -1));
          if (this.secondBox !== null) this.secondBox.x = otherBox.x + (global.config.unit * (deltaX > 0 ? 1 : -1));
        }
        if (direction === 'y') {
          collider.element.y = otherBox.y + (global.config.unit * (deltaY > 0 ? 1 : -1));
          actor.element.y = collider.element.y + (global.config.unit * (deltaY > 0 ? 1 : -1));
          if (this.secondBox !== null) this.secondBox.y = otherBox.y + (global.config.unit * (deltaY > 0 ? 1 : -1));  
        }

      // Is our move otherwise legitimate?
      } else if (!collider.element.checkGrid(collider.element.x, collider.element.y)) {
        // If not, push everything as far as we can

        // Center the box on the current grid spot
        if (direction === 'x') collider.element.x = (Math.floor(collider.element.prevX / global.config.unit) * global.config.unit) + global.config.unit / 2;
        if (direction === 'y') collider.element.y = (Math.floor(collider.element.prevY / global.config.unit) * global.config.unit) + global.config.unit / 2;

        // If we have a secondBox, center that on the current grid spot
        if (this.secondBox !== null) {
          if (direction === 'x') this.secondBox.x = (Math.floor(collider.element.prevX / global.config.unit) * global.config.unit) + global.config.unit / 2;
          if (direction === 'y') this.secondBox.y = (Math.floor(collider.element.prevY / global.config.unit) * global.config.unit) + global.config.unit / 2;
        }

        // Center the player on the current grid spot
        if (direction === 'x') actor.element.x = (Math.floor(actor.element.prevX / global.config.unit) * global.config.unit) + global.config.unit / 2;
        if (direction === 'y') actor.element.y = (Math.floor(actor.element.prevY / global.config.unit) * global.config.unit) + global.config.unit / 2;
      }

      // Since we can only ever push two boxes at most, toggle the secondBox
      this.secondBox = this.secondBox === null ? collider.element : null;

    }
  }

  private collidesWithOtherBox(collider): Actor {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      // Make sure this is not the box we are pushing or the player
      if (actor.element !== collider.element && !actor.element.isActive()) {
        // Is this second box colliding right now?
        const isColliding = actor.element.isCollidingWith(collider.element);
        // If it is and it is a box, then stop the show
        if (isColliding) return actor.element;
      }
    }
    // All clear
    return null;
  }
}
