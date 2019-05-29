import Actor from './Actor';

export default interface IThreat {
  isHarmful(actor: Actor): Boolean;
}
