import Actor from './Actor';

export default interface IMovable {
  isMovable(actor: Actor): Boolean;
}
