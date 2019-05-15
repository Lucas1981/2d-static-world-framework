export interface IGame {
  titleScreen(): void;
  beforeStage(): void;
  stage(): void;
  stageCompleted(): void;
  gameCompleted(): void;
  dead(): void;
  gameOver(): void;
  resetStage(): void;
  resetGame(): void;
}
