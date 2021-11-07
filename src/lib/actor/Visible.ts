import IVisible from './IVisible';
import Actor from './Actor';

export default class Visible implements IVisible {
  constructor() {}
  isVisible(actor: Actor): Boolean { return !actor.state.tags.includes('invisible'); }
};
