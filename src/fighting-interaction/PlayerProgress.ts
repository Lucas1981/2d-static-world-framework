import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';
import { playerStates } from './states';
import global from '../lib/Global';

export default class PlayerProgress implements IProgress {
  private lock: boolean;
  constructor() {
    console.log(playerStates);
    this.lock = false;
  }

  progress(actor: Actor) {
    if (global.keyboard.state.space && !this.lock) {
      console.log('changing condition');
      this.lock = true;
      console.log(actor.condition);
      actor.condition = (actor.condition + 1) % playerStates.length;
      console.log(actor.condition);
    }

    if (!global.keyboard.state.space) this.lock = false;
  }
}
