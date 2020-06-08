import Actor from '../lib/actor/Actor';
import Grid from '../lib/Grid';
import TextWriter from '../resources/TextWriter';
import { IStage } from '../lib/IStage';
import { GameState } from '../lib/GameState';
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

  private collidesWithOtherBox(collider) {
  }

  private drawScore(totalBoxes, checkedBoxes) {
  }
}
