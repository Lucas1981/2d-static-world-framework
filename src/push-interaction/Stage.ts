import Actor from '../lib/Actor';
import Grid from '../lib/Grid';
import { IStage } from '../lib/IStage';
import global from '../lib/Global';

const statusBarColor = "#FFFFFF";
const target = 2;

export default class Stage implements IStage {
  private secondBox: Actor;

  constructor() {
  }

  public beforeDetectCollision() {
    this.secondBox = null;
  }

  public handleCollision(actor, collider) {
    // Are we dealing with a box?
    if (
      // Exclude the markers
      !collider.element.canHurt() &&
      !actor.element.canHurt() &&
      // Check for the rest
      !collider.element.isActive() &&
      actor.element.isActive()
    ) {
      // Let's try to move the box

      // We will need to know where the actor wants to push the box

      const grid: Grid = global.maps[global.activeMap].grid;
      const deltaX: number = actor.element.x - collider.element.x;
      const deltaY: number = actor.element.y - collider.element.y;
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
      } else if (!grid.checkGrid(collider.element.x, collider.element.y)) {
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

      // Register the first box
      this.secondBox = collider.element;

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
            if (!actor.element.isActive() && actor.element.hitsGrid(global.maps[global.activeMap].grid, j, i)) checkedBoxes++;
          }
        }
      }
    }
    this.drawScore(allMarks, checkedBoxes);
  }

  private collidesWithOtherBox(collider): Actor {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      // Make sure this is not the box we are pushing or the player
      if (
        actor.element !== collider.element &&
        !actor.element.isActive() &&
        !actor.element.canHurt()
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
    global.canvas.clearRect(
      0,
      global.config.unit * global.config.gridHeight,
      global.config.unit * global.config.gridWidth,
      (global.config.unit * 3) * global.config.gridHeight,
    )
    global.canvas.write(
      `Checked boxes: ${checkedBoxes} / ${totalBoxes}`,
      statusBarColor,
      statusBarColor,
      24,
      global.config.unit * global.config.gridHeight + 20,
      (global.config.gridWidth * global.config.unit),
      'right'
    );
  }
}
