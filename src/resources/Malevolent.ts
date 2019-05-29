import Actor from '../lib/Actor';
import IVolition from '../lib/IVolition';

export default class Malevolent implements IVolition {
  constructor() {}
  public isBenevolent(actor: Actor): Boolean { return false; }
}
