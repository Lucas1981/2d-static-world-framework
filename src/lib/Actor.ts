import IMovable from './IMovable';
import IHurtable from './IHurtable';
import IActionable from './IActionable';
import Collision from './Collision';
import Frame from './Frame';
import global from './Global';

export default class Actor {
  private animationKey: string;
  private stateChange: any;
  private alive: Boolean;
  private context: any;

  constructor(
    private _x: number,
    private _y: number,
    private animationKeys: string[],
    private movable: IMovable,
    private hurtable: IHurtable,
    private actionable: IActionable
  ) {
    this.animationKey = Object.keys(this.animationKeys)[0];
    this.stateChange = global.clock.getTime();
    this.alive = true;
    this.context = global.canvas.getContext();
  }

  public updateAnimationKey(animationKey) {
    if (this.animationKey !== animationKey) {
      this.animationKey = animationKey;
      this.stateChange = global.clock.getTime();
    }
  }

  public get x(): number {
    return this._x;
  }

  public set x(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }

  public progress(): void {
    this.movable.progress(this);
  }

  public canHurt(): Boolean {
    return this.hurtable.canHurt();
  }

  public isActive(): Boolean {
    return this.actionable.isActive();
  };

  public isAlive(): Boolean {
    return this.alive;
  }

  public die(): void {
    this.alive = false;
  }

  public getCurrentBox(): any {
    return {
      x: Math.floor(this._x) - (global.config.unit / 2),
      y: Math.floor(this._y) - (global.config.unit / 2),
      width: global.config.unit,
      height: global.config.unit
    }
  }

  public getCurrentFrame(): Frame {
    const now: any = global.clock.getTime();
    const elapsedTime: number = now - this.stateChange;
    const frame: Frame = global.animations.data[
      this.animationKeys[this.animationKey]
    ].getCurrentFrame(elapsedTime);

    return frame;
  }

  public checkGrid(probeX: number, probeY: number): Boolean {
    const probeLeft: number = this.playerToGrid(probeX - (global.config.unit / 2));
    const probeRight: number = this.playerToGrid(probeX + (global.config.unit / 2) - 1);
    const probeTop: number = this.playerToGrid(probeY - (global.config.unit / 2));
    const probeBottom: number = this.playerToGrid(probeY + (global.config.unit / 2) - 1);

    return (
      global.maps[global.activeMap].grid.isSafe(probeLeft, probeTop) &&
      global.maps[global.activeMap].grid.isSafe(probeRight, probeTop) &&
      global.maps[global.activeMap].grid.isSafe(probeLeft, probeBottom) &&
      global.maps[global.activeMap].grid.isSafe(probeRight, probeBottom)
    );
  }

  public draw(animate: boolean = true): void {
    const now: any = global.clock.getTime();
    const elapsedTime: number = now - this.stateChange;
    const animationKey = this.animationKeys[this.animationKey];
    global.animations.data[animationKey].draw(
      this.context,
      Math.floor(this._x - (global.config.unit / 2)),
      Math.floor(this._y - (global.config.unit / 2)),
      elapsedTime,
      animate
    );
  }

  private playerToGrid(value): number {
    return Math.floor(value / global.config.unit);
  }

  public detectCollision(): any {
    for(let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      if(
        actor.element !== this &&
        Collision.isColliding(this, actor.element)
      ) {
        return actor;
      }
    }
    return null;
  }
}
