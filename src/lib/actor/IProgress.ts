import Actor from './Actor';

export default interface IProgress {
  progress(actor: Actor): void;
}
