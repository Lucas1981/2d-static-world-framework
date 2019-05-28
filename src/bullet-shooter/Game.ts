import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';

const waitingTime = 1500;
const textFillColor = "#FFCF40";
const textStrokeColor = "#A67C00";
const statusBarColor = "#FFFFFF";

export default class Game extends AbstractGame implements IGame {

  constructor(stage: IStage) {
    super(stage);
    this.global.activeMap = 0;
    this.global.gameState = GameState.Stage;
  }

  public titleScreen(): void {
  }

  public beforeStage(): void {
    this.global.gameState = GameState.Stage;
  }

  public stage(): void {
    this.mainLoop.run();
    this.global.canvas.clearRect(
      0,
      this.global.config.unit * this.global.config.gridHeight,
      this.global.config.unit * this.global.config.gridWidth,
      (this.global.config.unit * 3) * this.global.config.gridHeight,
    )
  }

  public stageCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      this.writeMainMessage('Stage clear!');
    } else {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public gameCompleted(): void {
  }

  public dead(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      this.writeMainMessage('You dead!');
    } else {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public resetGame(): void {
  }

  public gameOver(): void {
  }

  private writeMainMessage(message) {
    const x = (this.global.config.unit * this.global.config.gridWidth) / 2;
    const y = (this.global.config.unit * this.global.config.gridHeight) / 2;
    this.global.canvas.write(
      message,
      textFillColor, textStrokeColor,
      40, y, x
    );
  }

  private drawStageAndStatusBar(progress: boolean = true, animate: boolean = true, actors: boolean = true) {
    this.mainLoop.run(progress, animate, actors);
    this.global.canvas.clearRect(
      0,
      this.global.config.unit * this.global.config.gridHeight,
      this.global.config.unit * this.global.config.gridWidth,
      (this.global.config.unit * 3) * this.global.config.gridHeight,
    )
  }

  public resetStage(): void {
    this.global.keyboard.reset();
    this.global.clock.setTime();
    this.global.maps[this.global.activeMap] = this.Generator.reloadMap(
      this.global.gameData.maps[this.global.activeMap],
      this.global.gameData,
      this.global.actorAttributes
    );
    this.global.gameState = GameState.BeforeStage;
  }
}
