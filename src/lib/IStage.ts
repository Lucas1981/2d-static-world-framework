export interface IStage {
  beforeDetectCollision(): void;
  handleCollision(collider: any, actor: any): void;
  afterDetectCollision(): void;
  checkStage(): void;
}
