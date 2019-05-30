import IMovable from './IMovable';
import Actor from './Actor';

export default class Immovable implements IMovable {
  constructor() {}
  isMovable(actor: Actor) { return actor.state.tags.includes('movable'); }
};
