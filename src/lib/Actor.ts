import IMovable from './IMovable';
import IHurtable from './IHurtable';
import IActionable from './IActionable';
import Collision from './Collision';
import Frame from './Frame';
import Grid from './Grid';
import global from './Global';

export default class Actor {
  private animationKey: string;
  private animationKeyNames: string[];
  private stateChange: any;
  private alive: Boolean;
  private context: any;
  private _prevX: number;
  private _prevY: number;
  private _originX: number;
  private _originY: number;

  constructor(
    private _x: number,
    private _y: number,
    private animationKeys: any[],
    private movable: IMovable,
    private hurtable: IHurtable,
    private actionable: IActionable
  ) {
    this.animationKeyNames = Object.keys(this.animationKeys);
    this.animationKey = this.animationKeyNames[0];
    this.stateChange = global.clock.getTime();
    this.alive = true;
    this.context = global.canvas.getContext();
    this._originX = this._x;
    this._originY = this._y;
  }

  public updateAnimationKey(animationKey) {
    if (this.animationKey !== animationKey && this.animationKeyNames.indexOf(animationKey) !== -1) {
      this.animationKey = animationKey;
      this.stateChange = global.clock.getTime();
    }
  }

  public getTimeSinceLastStateChange() {
    return global.clock.getTime() - this.stateChange;
  }

  public get x(): number {
    return this._x;
  }

  public set x(x: number) {
    this._prevX = this._x;
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._prevY = this._y;
    this._y = y;
  }

  public get prevX(): number {
    return this._prevX;
  }

  public get prevY(): number {
    return this._prevY;
  }

  public set prevX(x: number) {
      this._prevX = x;
  }

  public set prevY(y: number) {
    this._prevY = y;
  }

  public get originX(): number {
    return this._originX;
  }

  public get originY() {
    return this._originY;
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

  public restorePreviousLocation() {
    this._x = this._prevX;
    this._y = this._prevY;
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

  public hitsGrid(grid: Grid, gridX: number, gridY: number): Boolean {
    const {
      probeLeft, probeRight, probeTop, probeBottom
    } = grid.getProbes(this._x, this._y);
    if (probeLeft == gridX && probeTop == gridY) return true;
    if (probeRight == gridX && probeTop == gridY) return true;
    if (probeLeft == gridX && probeBottom == gridY) return true;
    if (probeRight == gridX && probeBottom == gridY) return true;
    return false;
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

  public detectCollisions(): any {
    const collisions = [];
    for(let actor = global.maps[global.activeMap].actors.first(); actor !== null; actor = actor.next) {
      if(
        actor.element !== this &&
        Collision.isColliding(this, actor.element)
      ) {
        collisions.push(actor);
      }
    }
    return collisions;
  }

  public isCollidingWith(actor: Actor): boolean {
    return Collision.isColliding(this, actor);
  }
}
