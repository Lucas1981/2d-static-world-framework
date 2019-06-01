import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';
import TextWriter from '../resources/TextWriter';

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
    TextWriter.writeMainMessage('~ Game Demo ~');
    TextWriter.writeSubMessage("Press space to begin");
    if (this.global.keyboard.state.space) {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public beforeStage(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false, false);
      TextWriter.writeMainMessage('Get ready!');
    } else {
      this.global.gameState = GameState.Stage;
    }
  }

  public stage(): void {
    if (this.global.keyboard.state.escape) {
      this.global.gameState = GameState.ResetGame;
    } else {
      this.drawStageAndStatusBar();
    }
  }

  public stageCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      TextWriter.writeMainMessage('Stage completed!');
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
      TextWriter.writeMainMessage('You finished the game!');
    } else {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
  }

  public dead(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      TextWriter.writeMainMessage('You dead!');
    } else {
      this.lives--;
      if (this.lives !== 0) {
        this.global.gameState = GameState.ResetStage;
      } else {
        this.global.sound.play('game-over');
        this.global.gameState = GameState.GameOver;
      }
    }
  }

  public resetGame(): void {
    this.drawStageAndStatusBar(false);
    TextWriter.writeMainMessage('Reset game?');
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
      TextWriter.writeMainMessage('Game over!');
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
    TextWriter.writeStatusBar(`Lives= ${this.lives}`, 'right');
  }

  private newGame(): void {
    this.global.activeMap = 0;
    this.lives = initialNumberOfLives;
  }
}
