import IActionable from '../lib/IActionable';

export default class Active implements IActionable {
  public isActive(): Boolean { return true; }
}
