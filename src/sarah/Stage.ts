import Actor from '../lib/actor/Actor';
import Grid from '../lib/Grid';
import TextWriter from '../resources/TextWriter';
import { IStage } from '../lib/IStage';
import global from '../lib/Global';

const target = 2;
const defaultBoundingBox = { top: 0, bottom: 0, left: 0, right: 0 };

export default class Stage implements IStage {
  constructor() {
  }

  public handleCollision(colliders, actor) {
    let secondBox = null;

    for (const collider of colliders) {
      // Are we dealing with a box?
      if (
        // Make sure this is the player pushing a box
        actor.element.isMovable() &&
        !collider.element.isMovable()
      ) {
        // Let's try to move the box

        // We will need to know where the actor wants to push the box
        const deltaX: number = collider.element.x - actor.element.x;
        const deltaY: number = collider.element.y - actor.element.y;
        const animationKey: number = collider.element.state.animationKey;
        const animation = global.animations.data[animationKey];
        const boundingBox = animation.boundingBox;
        let direction: string = null;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          actor.element.x += (deltaX < 0 ? 1 : -1) * (global.config.unit - Math.abs(deltaX));
          if (deltaX < 0) actor.element.x -= animation.boundingBox.left;
          else actor.element.x += animation.boundingBox.right;
          direction = 'x';
        } else {
          actor.element.y += (deltaY < 0 ? 1 : -1) * (global.config.unit - Math.abs(deltaY));
          direction = 'y';
        }

        // Check if the move is legitimate
        const otherBox = this.collidesWithOtherBox(actor);

        // Did our box hit another box?
        if (otherBox !== null) {

          // Now, we need to move the box we are trying to push and the player as close to the box blocking us as possible
          if (direction === 'x') {
            const correction = deltaX > 0 ? -1 * boundingBox.left : boundingBox.right;
            actor.element.x = otherBox.x + (global.config.unit * (deltaX > 0 ? 1 : -1));
            collider.element.x = actor.element.x + (global.config.unit * (deltaX > 0 ? 1 : -1)) + correction;
            if (secondBox !== null) secondBox.x = otherBox.x + (global.config.unit * (deltaX > 0 ? 1 : -1));
          }
          if (direction === 'y') {
            const correction = deltaY > 0 ? -1 * boundingBox.top : boundingBox.bottom;
            actor.element.y = otherBox.y + (global.config.unit * (deltaY > 0 ? 1 : -1));
            collider.element.y = actor.element.y + (global.config.unit * (deltaY > 0 ? 1 : -1)) + correction;
            if (secondBox !== null) secondBox.y = otherBox.y + (global.config.unit * (deltaY > 0 ? 1 : -1));
          }

        // Is our move otherwise legitimate?
      } else if (!this.checkGrid(actor.element)) {

          // If not, push everything as far as we can

          // Center the box on the current grid spot
          if (direction === 'x') actor.element.x = (Math.floor(actor.element.prevX / global.config.unit) * global.config.unit) + global.config.unit / 2;
          if (direction === 'y') actor.element.y = (Math.floor(actor.element.prevY / global.config.unit) * global.config.unit) + global.config.unit / 2;

          // If we have a secondBox, center that on the current grid spot
          if (secondBox !== null) {
            if (direction === 'x') secondBox.x = (Math.floor(actor.element.prevX / global.config.unit) * global.config.unit) + global.config.unit / 2;
            if (direction === 'y') secondBox.y = (Math.floor(actor.element.prevY / global.config.unit) * global.config.unit) + global.config.unit / 2;
          }

          // Center the player on the current grid spot
          if (direction === 'x') collider.element.x = (Math.floor(
            collider.element.prevX / global.config.unit) * global.config.unit
          ) + (global.config.unit / 2) + (deltaX > 0 ? -1 * animation.boundingBox.left : animation.boundingBox.right);
          if (direction === 'y') collider.element.y = (Math.floor(
            collider.element.prevY / global.config.unit) * global.config.unit
          ) + global.config.unit / 2;
        }

        // Register the first box
        secondBox = actor.element;

      }
    }
  }

  public afterDetectCollision() {}

  public checkStage() {
    let allMarks: number = 0;
    let checkedBoxes: number = 0;
    const map: any = global.maps[global.activeMap].grid.map;
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 2) {
          allMarks++;
          for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
            if (actor.element.isMovable() && actor.element.hitsGrid(global.maps[global.activeMap].grid, j, i)) checkedBoxes++;
          }
        }
      }
    }
    this.drawScore(allMarks, checkedBoxes);
  }

  private checkGrid(actor: Actor) {
    const unit = global.config.unit;
    // We already know that the box is unit-sized, so we don't have to correct with boundingBox
    const result = global.maps[global.activeMap].grid.checkGrid(actor.x, actor.y, unit, unit);
    for (const key in result) {
      if (!result[key]) return false;
    }
    return true;
  }

  private collidesWithOtherBox(collider): Actor {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      // Make sure this is not the box we are pushing or the player
      if (
        actor.element !== collider.element &&
        actor.element.isMovable()
      ) {
        // Is this second box colliding right now?
        const isColliding: boolean = actor.element.isCollidingWith(collider.element);
        // If it is and it is a box, then stop the show
        if (isColliding) return actor.element;
      }
    }
    // All clear
    return null;
  }

  private drawScore(totalBoxes, checkedBoxes) {
    TextWriter.writeStatusBar(`Checked boxes: ${checkedBoxes} / ${totalBoxes}`, 'right');
  }
}
