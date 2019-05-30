import Actor from '../lib/Actor';
import IActionable from '../lib/IActionable';

export default class Passive implements IActionable {
  constructor() {}
  public isActive(actor: Actor): Boolean { return actor.state.tags.includes('active'); }
}
