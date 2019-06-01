import Actor from '../lib/actor/Actor';
import Immovable from '../lib/actor/Immovable';
import Harmful from '../lib/actor/Harmful';
import Malevolent from '../lib/actor/Malevolent';
import Invulnerable from '../lib/actor/Invulnerable';
import Active from '../lib/actor/Active';
import BulletProgress from './BulletProgress';
import NoStateChange from '../resources/NoStateChange';
import IProgress from '../lib/actor/IProgress';
import global from '../lib/Global';

const pixelsPerSecond = 200;
const timeToNextShot = 500;
const numberOfDirections = 4;

export default class Enemy1Progress implements IProgress {
  private lastShotFired: number;

  constructor() {
    this.lastShotFired = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    const actorType = global.gameData.actors.find(e => e.name === 'enemyBullet');
    if (now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = global.clock.getTime();
      actor.direction = ((actor.direction) + 1) % numberOfDirections;
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
        new Malevolent(),
        new Invulnerable(),
        new Active()
      ));
    }
  }
}
