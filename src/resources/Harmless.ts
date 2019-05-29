import Actor from '../lib/Actor';
import IThreat from '../lib/IThreat';

export default class Harmless implements IThreat {
  constructor() {}
  public isHarmful(actor: Actor): Boolean { return false; }
}
