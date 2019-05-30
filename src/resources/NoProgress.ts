import Actor from '../lib/Actor';
import IProgress from '../lib/IProgress';

export default class NoProgress implements IProgress {
  constructor() {}

  public progress(actor: Actor) {
    // Items don't move
  }
};