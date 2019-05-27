import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';

const waitingTime = 1500;
const textFillColor = "#FFCF40";
const textStrokeColor = "#A67C00";
const statusBarColor = "#FFFFFF";

const initialNumberOfLives = 3;

export default class Game extends AbstractGame implements IGame {
  private lives: number;

  constructor(stage: IStage) {
    super(stage);
    this.newGame();
    this.global.gameState = GameState.TitleScreen;
  }

  public titleScreen(): void {
    this.global.canvas.clearCanvas();
    this.writeMainMessage('~ Game Demo ~');
    this.global.canvas.write(
      "Press space to begin",
      textFillColor,
      textStrokeColor,
      20, 320
    );
    if (this.global.keyboard.state.space) {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public beforeStage(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false, false);
      this.writeMainMessage('Get ready!');
    } else {
      this.global.gameState = GameState.Stage;
    }
  }

  public stage(): void {
    this.drawStageAndStatusBar();
  }

  public stageCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      this.writeMainMessage('Stage completed!');
    } else {
      this.global.activeMap++;
      this.global.gameState = GameState.ResetStage;
      if (this.global.activeMap === this.global.maps.length) {
        this.global.gameState = GameState.GameCompleted;
      }
    }
  }

  public gameCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.global.canvas.clearCanvas();
      this.writeMainMessage('You finished the game!');
    } else {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
  }

  public dead(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      this.writeMainMessage('You dead!');
    } else {
      this.lives--;
      if (this.lives !== 0) {
        this.global.gameState = GameState.ResetStage;
      } else {
        this.global.gameState = GameState.GameOver;
      }
    }
  }

  public resetGame(): void {
    this.drawStageAndStatusBar(false);
    this.writeMainMessage('Reset game?');
    if (this.global.keyboard.state.yes) {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
    if(this.global.keyboard.state.no) {
      this.global.gameState = GameState.Stage;
    }
  }

  public gameOver(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false, false, false);
      this.writeMainMessage('Game over!');
    } else {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
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

  private drawStageAndStatusBar(progress: boolean = true, animate: boolean = true, actors: boolean = true) {
    this.mainLoop.run(progress, animate, actors);
    this.global.canvas.clearRect(
      0,
      this.global.config.unit * this.global.config.gridHeight,
      this.global.config.unit * this.global.config.gridWidth,
      (this.global.config.unit * 3) * this.global.config.gridHeight,
    )
    this.global.canvas.write(
      `Lives= ${this.lives}`,
      statusBarColor,
      statusBarColor,
      24,
      this.global.config.unit * this.global.config.gridHeight + 20,
      (this.global.config.gridWidth * this.global.config.unit),
      'right'
    );
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

  private newGame(): void {
    this.global.activeMap = 0;
    this.lives = initialNumberOfLives;
  }
}
