import Actor from './Actor';

export default interface IActionable {
  isActive(actor: Actor): Boolean;
}
