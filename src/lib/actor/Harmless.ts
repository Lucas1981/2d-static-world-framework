import Actor from './Actor';
import IThreat from './IThreat';

export default class Harmless implements IThreat {
  constructor() {}
  public isHarmful(actor: Actor): Boolean { return actor.state.tags.includes('harmful'); }
}
