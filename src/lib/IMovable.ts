import Actor from './Actor';

export default interface IMovabel {
  progress(actor: Actor): void;
}
