import { IStage } from '../lib/IStage';

export default class Stage implements IStage {
  constructor() {}

  public checkStage() {
  }

  public beforeDetectCollision() {}
  public afterDetectCollision() {}
  public handleCollision(collider, actor) {
  }
}
