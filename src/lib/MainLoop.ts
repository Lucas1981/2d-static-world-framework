import Actor from './actor/Actor';
import { IStage } from './IStage';
import global from './Global';

export default class MainLoop {

  constructor(
    private stage: IStage
  ) {}

  public run(progress: boolean = true, animate: boolean = true, handleActors: boolean = true): void {
    global.maps[global.activeMap].grid.draw();
    if (handleActors) {
      this.moveObjects(progress);
    }
    if (progress) {
      this.detectCollision();
      this.checkStage();
    }
    if (handleActors) {
      this.drawObjects(animate);
    }
  }

  private moveObjects(progress: boolean): void {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      if(!actor.element.isAlive()) {
        global.maps[global.activeMap].actors.remove(actor.element);
      } else {
        if (progress) actor.element.progress();
      }
    }
  }

  private drawObjects(animate: boolean) {
    // Then, let's draw everything
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      actor.element.draw(animate);
    }
  }

  private detectCollision(): void {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      const colliders = actor.element.detectCollisions();
      // Try this if we found something other than ourselves
      if (colliders.length > 0) {
        this.handleCollision(colliders, actor);
      }
    }
  }

  private handleCollision(collider: Actor, actor: Actor) {
    this.stage.handleCollision(collider, actor);
  }

  private checkStage() {
    this.stage.checkStage();
  }
};
