import { IStage } from '../lib/IStage';
import global from '../lib/Global';

const statusBarColor = "#FFFFFF";

export default class Stage implements IStage {
  constructor() {}

  public checkStage() {
  }

  public handleCollision(colliders, actor) {
    const collider = colliders[0];
    if (
      !collider.element.isBenevolent() &&
      actor.element.isBenevolent()
    ) {
      if (
        collider.element.isHarmful() &&
        actor.element.isVulnerable()
      ) {
        this.printToScreen("Player would be hurt by enemy");
      } else {
        this.printToScreen("Player wouldn't be hurt by enemy");
      }
    }
  }

  private printToScreen(message) {
    global.canvas.write(
      message,
      statusBarColor,
      statusBarColor,
      24,
      global.config.unit * global.config.gridHeight + 20,
      0,
      'left'
    );
  }

}
