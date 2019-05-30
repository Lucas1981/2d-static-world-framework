import Actor from '../lib/Actor';
import Immovable from '../resources/Immovable';
import Harmful from '../resources/Harmful';
import Malevolent from '../resources/Malevolent';
import Invulnerable from '../resources/Invulnerable';
import Active from '../resources/Active';
import BulletProgress from './BulletProgress';
import global from '../lib/Global';

const directions = ['up', 'right', 'down', 'left'];

const timeToNextShot = 1000;

export default class Enemy2Progress {
  public direction;
  private lastShotFired: number;

  constructor() {
    this.direction = directions[0];
    this.lastShotFired = global.clock.getTime();
  }

  public progress(actor: Actor) {
    const now = global.clock.getTime();
    const actorType = global.gameData.actors.find(e => e.name === 'enemyBullet');
    if (now - this.lastShotFired > timeToNextShot) {
      this.lastShotFired = global.clock.getTime();
      global.maps[global.activeMap].actors.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x,
        actor.y,
        actorType.states,
        new BulletProgress(this.direction),
        new Immovable(),
        new Harmful(),
        new Malevolent(),
        new Invulnerable(),
        new Active()
      ));
    }
  }

}
