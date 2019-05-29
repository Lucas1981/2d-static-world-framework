import Actor from '../lib/Actor';
import IActionable from '../lib/IActionable';

export default class Passive implements IActionable {
  public isActive(actor: Actor): Boolean { return false; }
}
