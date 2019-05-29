import IVulnerable from '../lib/IVulnerable';

export default class Vulnerable implements IVulnerable {
  constructor() {}
  public isVulnerable(): Boolean { return true; }
}
