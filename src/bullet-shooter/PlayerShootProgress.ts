import Actor from '../lib/actor/Actor';
import Immovable from '../lib/actor/Immovable';
import Harmful from '../lib/actor/Harmful';
import Benevolent from '../lib/actor/Benevolent';
import Invulnerable from '../lib/actor/Invulnerable';
import Active from '../lib/actor/Active';
import BulletProgress from './BulletProgress';
import NoStateChange from '../resources/NoStateChange';
import IProgress from '../lib/actor/IProgress';
import global from '../lib/Global';

const pixelsPerSecond = 200;
const timeToNextShot = 500;

export default class PlayerShootProgress implements IProgress {
  private lastShotFired: number;
  constructor() {
    this.lastShotFired = null;
  }

  public progress(actor: Actor) {
    if (global.keyboard.state.space && this.canFire()) {
      const actorType = global.gameData.actors.find(e => e.name === 'playerBullet');
      global.maps[global.activeMap].actors.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x,
        actor.y,
        0, actor.direction,
        actorType.states,
        [new BulletProgress()],
        new NoStateChange(),
        new Immovable(),
        new Harmful(),
        new Benevolent(),
        new Invulnerable(),
        new Active()
      ));
    }
  }

  private canFire() {
    const now = global.clock.getTime();
    if (this.lastShotFired === null || now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = now;
      return true;
    }
    return false;
  }
}
