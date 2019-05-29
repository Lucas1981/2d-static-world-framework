import IThreat from '../lib/IThreat';

export default class Harmless implements IThreat {
  constructor() {}
  public isHarmful(): Boolean { return false; }
}
