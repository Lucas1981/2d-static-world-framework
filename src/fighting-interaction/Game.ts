import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';

export default class Game extends AbstractGame implements IGame {
  constructor(stage: IStage) {
    super(stage);
    this.global.activeMap = 0;
    this.global.gameState = GameState.Stage;
  }

  public titleScreen(): void {
  }

  public beforeStage(): void {
  }

  public stage(): void {
    this.global.canvas.clearRect(
      0,
      this.global.config.unit * this.global.config.gridHeight,
      this.global.config.unit * this.global.config.gridWidth,
      (this.global.config.unit * 3) * this.global.config.gridHeight,
    )
    this.mainLoop.run();
  }

  public stageCompleted(): void {
  }

  public gameCompleted(): void {
  }

  public dead(): void {
  }

  public resetGame(): void {
  }

  public gameOver(): void {
  }

  public resetStage(): void {
  }
}
