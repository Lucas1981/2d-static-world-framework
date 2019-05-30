import Actor from '../lib/actor/Actor';
import IProgress from '../lib/actor/IProgress';

export default class ItemProgress implements IProgress {
  constructor() {}

  public progress(actor: Actor) {
    // Items don't move
  }
};
