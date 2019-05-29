import IVolition from '../lib/IVolition';

export default class Benevolent implements IVolition {
  constructor() {}
  public isBenevolent(): Boolean { return true; }
}
