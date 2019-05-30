import Actor from './Actor';
import IActionable from './IActionable';

export default class Passive implements IActionable {
  constructor() {}
  public isActive(actor: Actor): Boolean { return actor.state.tags.includes('active'); }
}
