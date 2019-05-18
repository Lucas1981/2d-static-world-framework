import IHurtable from '../lib/IHurtable';

export default class Beneficent implements IHurtable {
  public canHurt(): Boolean { return true; }
}
