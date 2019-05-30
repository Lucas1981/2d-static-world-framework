import Actor from '../lib/Actor';
import IVulnerable from '../lib/IVulnerable';

export default class Invulnerable implements IVulnerable {
  constructor() {}
  public isVulnerable(actor: Actor): Boolean { return actor.state.tags.includes('vulnerable'); }
}
