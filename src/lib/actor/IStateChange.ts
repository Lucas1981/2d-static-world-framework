import Actor from './Actor';

export default interface IStateChange {
  changeState(actor: Actor): void;
}
