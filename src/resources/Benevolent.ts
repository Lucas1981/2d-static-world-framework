import IHurtable from '../lib/IHurtable';

export default class Benevolent implements IHurtable {
  public canHurt(): Boolean { return false; }
}
