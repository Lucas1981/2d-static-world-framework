import Actor from '../lib/Actor';
import IMovable from '../lib/IMovable';

export default class ItemMover implements IMovable {
  constructor() {}

  public progress(actor: Actor) {
    // Items don't move
  }
};
