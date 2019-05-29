import IThreat from '../lib/IThreat';

export default class Harmful implements IThreat {
  constructor() {}
  public isHarmful(): Boolean { return true; }
}
