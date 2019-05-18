import IActionable from '../lib/IActionable';

export default class Passive implements IActionable {
  public isActive(): Boolean { return false; }
}
