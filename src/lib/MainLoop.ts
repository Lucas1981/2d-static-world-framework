import { IStage } from './IStage';
import global from './Global';

export default class MainLoop {

  constructor(
    private stage: IStage
  ) {}

  public run(progress: boolean = true, animate: boolean = true, actors: boolean = true): void {
    this.moveAndDrawObjects(progress, animate, actors);
    if (progress) {
      this.detectCollision();
      this.checkStage();
    }
  }

  private moveAndDrawObjects(progress: boolean, animate: boolean, actors: boolean): void {
    global.maps[global.activeMap].grid.draw();
    if (actors) {
      for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
        if(!actor.element.isAlive()) {
          global.maps[global.activeMap].actors.remove(actor.element);
        } else {
          if (progress) actor.element.progress();
          actor.element.draw(animate);
        }
      }
    }
  }

  private detectCollision(): void {
    for (let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      if (actor.element.isActive()) {
        const collider = actor.element.detectCollision();
        if(collider !== null) {
          this.handleCollision(collider, actor);
        }
      }
    }
  }

  private handleCollision(collider, actor) {
    this.stage.handleCollision(collider, actor);
  }

  private checkStage() {
    this.stage.checkStage();
  }
};
