import Actor from './Actor';

export default interface IVisible {
  isVisible(actor: Actor): Boolean;
}
