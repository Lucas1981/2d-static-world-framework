import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import TextWriter from '../resources/TextWriter';
import AbstractGame from '../lib/AbstractGame';

const statusBarColor = "#FFFFFF";

export default class Game extends AbstractGame implements IGame {
  constructor(stage: IStage) {
    super(stage);
    this.global.activeMap = 0;
    this.global.gameState = GameState.Stage;
    this.global.pubsub.subscribe('status', this.writeStatusBar.bind(this));
  }

  public titleScreen(): void {
  }

  public beforeStage(): void {
  }

  public stage(): void {
    TextWriter.clearStatusBar();
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

  private writeStatusBar(topic, message) {
    TextWriter.writeStatusBar(message);
  }
}
