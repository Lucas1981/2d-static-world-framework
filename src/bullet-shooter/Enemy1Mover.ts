import Actor from '../lib/Actor';
import PlayerMover from '../resources/PlayerMover';
import Malevolent from '../resources/Malevolent';
import Active from '../resources/Active';
import BulletMover from './BulletMover';
import global from '../lib/Global';

const directions = ['up', 'right', 'down', 'left'];

const pixelsPerSecond = 200;
const timeToNextShot = 500;

export default class Enemy1Mover {
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
      this.direction = directions[((directions.indexOf(this.direction) + 1) % directions.length)];
      global.maps[global.activeMap].actors.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x,
        actor.y,
        actorType.states,
        new BulletMover(this.direction),
        new Malevolent(),
        new Active(),
      ));
    }

    this.updateAnimationKey(actor);
  }

  public updateAnimationKey(actor: Actor) {
    actor.updateAnimationKey(this.direction);
  }
}
