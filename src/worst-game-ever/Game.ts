import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';
import TextWriter from '../resources/TextWriter';

const statusBarColor = "#FFFFFF";
const waitingTime = 1500;
const colorNames = [
  "red", "green", "blue", "yellow",
  "orange", "brown", "purple", "pink"
];

export default class Game extends AbstractGame implements IGame {
  constructor(stage: IStage) {
    super(stage);
    this.global.gameState = GameState.TitleScreen;
  }

  public titleScreen(): void {
    this.global.canvas.clearCanvas();
    const color = colorNames[Math.floor(Math.random() * colorNames.length)];
    TextWriter.writeMainMessage("WORST. GAME. EVVVERRR!!!", color);
    TextWriter.writeSubMessage("Press space to begin", color);
    if (this.global.keyboard.state.space) {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public beforeStage(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      const color = colorNames[Math.floor(Math.random() * colorNames.length)];
      TextWriter.writeMainMessage(`Stage ${this.global.activeMap + 1}. Get ready!`, color);
    } else {
      this.global.gameState = GameState.Stage;
    }
  }

  public stage(): void {
    if (this.global.keyboard.state.escape) {
      this.global.gameState = GameState.ResetGame;
    } else {
      this.mainLoop.run();
    }
  }

  public stageCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      const color = colorNames[Math.floor(Math.random() * colorNames.length)];
      TextWriter.writeMainMessage('Stage completed!', color);
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
      const color = colorNames[Math.floor(Math.random() * colorNames.length)];
      TextWriter.writeMainMessage('You finished the game!', color);
    } else {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
  }

  public dead(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      const color = colorNames[Math.floor(Math.random() * colorNames.length)];
      TextWriter.writeMainMessage('You dead!', color);
    } else {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public resetGame(): void {
    this.drawStageAndStatusBar(false);
    const color = colorNames[Math.floor(Math.random() * colorNames.length)];
    TextWriter.writeMainMessage('Reset game?', color);
    if (this.global.keyboard.state.yes) {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
    if(this.global.keyboard.state.no) {
      this.global.gameState = GameState.Stage;
    }
  }

  public gameOver(): void {
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
  }

  private newGame(): void {
    this.global.activeMap = 0;
  }
}
