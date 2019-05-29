import IVolition from '../lib/IVolition';

export default class Malevolent implements IVolition {
  constructor() {}
  public isBenevolent(): Boolean { return false; }
}
