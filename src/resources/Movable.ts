import IMovable from '../lib/IMovable';
import Actor from '../lib/Actor';

export default class Movable implements IMovable{
  constructor() {}
  isMovable(actor: Actor) { return !actor.state.tags.includes('immovable'); }
};
