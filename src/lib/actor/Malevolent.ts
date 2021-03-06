import Actor from './Actor';
import IVolition from './IVolition';

export default class Malevolent implements IVolition {
  constructor() {}
  public isBenevolent(actor: Actor): Boolean { return actor.state.tags.includes('malevolent'); }
}
