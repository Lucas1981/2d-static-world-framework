import Actor from '../lib/Actor';
import IThreat from '../lib/IThreat';

export default class Harmful implements IThreat {
  constructor() {}
  public isHarmful(actor: Actor): Boolean { return !actor.state.tags.includes('harmless'); }
}
