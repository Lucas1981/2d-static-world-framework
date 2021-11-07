import IVisible from './IVisible';
import Actor from './Actor';

export default class Visible implements IVisible {
  constructor() {}
  isVisible(actor: Actor) { return actor.state.tags.includes('invisible'); }
};
