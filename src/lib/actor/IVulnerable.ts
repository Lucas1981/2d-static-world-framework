import Actor from './Actor';

export default interface IVulnerable {
  isVulnerable(actor: Actor): Boolean;
}
