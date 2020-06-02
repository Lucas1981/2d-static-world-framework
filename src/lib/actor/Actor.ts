import IProgress from './IProgress';
import IStateChange from './IStateChange';
import IMovable from './IMovable';
import IThreat from './IThreat';
import IVolition from './IVolition';
import IVulnerable from './IVulnerable';
import IActionable from './IActionable';
import Collision from '../Collision';
import Frame from '../Frame';
import Grid from '../Grid';
import global from '../Global';

export default class Actor {
  private _state: any;
  private stateName: string;
  private stateNames: string[];
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
    private _condition: number,
    private _direction: number,
    private states: string[],
    private _progress: IProgress[],
    private stateChanger: IStateChange,
    private movable: IMovable,
    private threat: IThreat,
    private volition: IVolition,
    private vulnerable: IVulnerable,
    private actionable: IActionable,
  ) {
    this.stateNames = Object.keys(this.states);
    this.stateName = this.stateNames[0];
    this._state = this.states[this.stateName];
    this.stateChange = global.clock.getTime();
    this.alive = true;
    this.context = global.canvas.getContext();
    this._originX = this._x;
    this._originY = this._y;
  }

  public progress(): void {
    for (const progress of this._progress) {
      progress.progress(this);
    }
    this.stateChanger.changeState(this);
  }

  public updateState(stateName: string) {
    if (this.stateName !== stateName && this.stateNames.indexOf(stateName) !== -1) {
      this._state = this.states[stateName];
      this.stateName = stateName;
      this.stateChange = global.clock.getTime();
    }
  }

  public getTimeSinceLastStateChange() {
    return global.clock.getTime() - this.stateChange;
  }

  public get state(): any {
    return this._state;
  }

  public get direction(): number {
    return this._direction;
  }

  public set direction(direction: number) {
    this._direction = direction;
  }

  public get condition(): number {
    return this._condition;
  }

  public set condition(condition: number) {
    this._condition = condition;
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

  public isMovable(): Boolean {
    return this.movable.isMovable(this);
  }

  public isHarmful(): Boolean {
    return this.threat.isHarmful(this);
  }

  public isBenevolent(): Boolean {
    return this.volition.isBenevolent(this);
  }

  public isVulnerable(): Boolean {
    return this.vulnerable.isVulnerable(this);
  }

  public isActive(): Boolean {
    return this.actionable.isActive(this);
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
      this._state.animationKey
    ].getCurrentFrame(elapsedTime);

    return frame;
  }

  public hitsGrid(grid: Grid, gridX: number, gridY: number): Boolean {
    const boundingBox = global.animations.data[this._state.animationKey].boundingBox;
    const halfUnit = global.config.unit / 2;
    const width = global.config.unit - (boundingBox.left + boundingBox.right);
    const height = global.config.unit - (boundingBox.top + boundingBox.bottom);
    const {
      probeLeftHorizontalBand, probeRightHorizontalBand, probeTopHorizontalBand, probeBottomHorizontalBand
    } = grid.getProbes(this._x + boundingBox.left, this._y + boundingBox.top, width, height);
    if (probeLeftHorizontalBand == gridX && probeTopHorizontalBand == gridY) return true;
    if (probeRightHorizontalBand == gridX && probeTopHorizontalBand == gridY) return true;
    if (probeLeftHorizontalBand == gridX && probeBottomHorizontalBand == gridY) return true;
    if (probeRightHorizontalBand == gridX && probeBottomHorizontalBand == gridY) return true;

    return false;
  }

  public draw(animate: boolean = true): void {
    const now: any = global.clock.getTime();
    const elapsedTime: number = now - this.stateChange;
    const animationKey = this._state.animationKey;
    const cameraX = global.cameraX;
    const cameraY = global.cameraY;
    if (
      this._x < cameraX - global.config.unit ||
      this._x > cameraX + global.config.cameraWidth + global.config.unit ||
      this._y < cameraY - global.config.unit ||
      this._y > cameraY + global.config.cameraHeight + global.config.unit
    ) return;
    global.animations.data[animationKey].draw(
      this.context,
      Math.floor(this._x - cameraX + (global.config.unit / 2)),
      Math.floor(this._y - cameraY + (global.config.unit / 2)),
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
