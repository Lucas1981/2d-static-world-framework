import { IStage } from '../lib/IStage';
import global from '../lib/Global';

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
        global.pubsub.publish('status', "Player would be hurt by enemy");
      } else {
        global.pubsub.publish('status', "Player wouldn't be hurt by enemy");
      }
    }
  }
}
