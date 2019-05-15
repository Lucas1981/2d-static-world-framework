export interface IStage {
  handleCollision(collider: any, actor: any): void;
  checkStage(): void;
}
