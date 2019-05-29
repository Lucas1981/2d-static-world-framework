import IVulnerable from '../lib/IVulnerable';

export default class Invulnerable implements IVulnerable {
  constructor() {}
  public isVulnerable(): Boolean { return false; }
}
