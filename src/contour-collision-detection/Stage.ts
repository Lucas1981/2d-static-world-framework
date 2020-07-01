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

  }

  public afterDetectCollision() {}

  public checkStage() {
  }

  private checkGrid(actor: Actor) {
  }

  private collidesWithOtherBox(collider): Actor {
    return;
  }

  private drawScore(totalBoxes, checkedBoxes) {
  }
}
