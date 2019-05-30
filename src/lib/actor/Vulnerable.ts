import Actor from './Actor';
import IVulnerable from './IVulnerable';

export default class Vulnerable implements IVulnerable {
  constructor() {}
  public isVulnerable(actor: Actor): Boolean { return !actor.state.tags.includes('invulnerable'); }
}
