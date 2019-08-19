import BulletProgress from './BulletProgress';
import NoStateChange from '../resources/NoStateChange';
import Immovable from '../lib/actor/Immovable';
import Harmful from '../lib/actor/Harmful';
import Malevolent from '../lib/actor/Malevolent';
import Invulnerable from '../lib/actor/Invulnerable';
import IVolition from '../lib/actor/IVolition';
import Active from '../lib/actor/Active';
import Generator from '../lib/Generator';
import global from '../lib/Global';

export default class BulletFactory {
  constructor() {}

  public static addBullet(x: number, y: number, state: number, direction: number, type: string) {
    const actorType: any = global.gameData.actors.find(e => e.name === type);
    Generator.addActor(
      x, y, state, direction,
      actorType.states,
      [new BulletProgress()],
      new NoStateChange(),
      new Immovable(),
      new Harmful(),
      new Malevolent(),
      new Invulnerable(),
      new Active()
    );
  }
}
