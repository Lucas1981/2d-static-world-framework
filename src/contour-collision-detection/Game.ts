import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';

export default class Game extends AbstractGame implements IGame {

  constructor(stage: IStage) {
    super(stage);
    this.global.activeMap = 0;
  }

  public titleScreen(): void {
    this.global.gameState = GameState.Stage;
  }

  public beforeStage(): void {
  }

  public stage(): void {
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
