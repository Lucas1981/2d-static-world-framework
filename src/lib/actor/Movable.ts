import IMovable from './IMovable';
import Actor from './Actor';

export default class Movable implements IMovable{
  constructor() {}
  isMovable(actor: Actor) { return !actor.state.tags.includes('immovable'); }
};
