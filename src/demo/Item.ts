import IActionable from '../lib/IActionable';
import IHurtable from '../lib/IHurtable';
import Actor from '../lib/Actor';
import IMovable from '../lib/IMovable';

class ItemActive implements IActionable {
  public isActive(): Boolean { return false; }
}

class ItemHurtable implements IHurtable {
  public canHurt(): Boolean { return false; }
}

class ItemMover implements IMovable {
  constructor() {}

  public progress(actor: Actor) {
    // Items don't move
  }
}

export { ItemActive, ItemHurtable, ItemMover };
