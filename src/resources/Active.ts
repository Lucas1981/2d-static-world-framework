import Actor from '../lib/Actor';
import IActionable from '../lib/IActionable';

export default class Active implements IActionable {
  public isActive(actor: Actor): Boolean { return true; }
}
