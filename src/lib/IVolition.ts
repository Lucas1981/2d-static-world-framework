import Actor from './Actor';

export default interface IVolition {
  isBenevolent(actor: Actor): Boolean;
}
