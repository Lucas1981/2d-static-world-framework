import { IStage } from '../lib/IStage';
import { IGame } from '../lib/IGame';
import { GameState } from '../lib/GameState';
import AbstractGame from '../lib/AbstractGame';
import TextWriter from '../resources/TextWriter';

const waitingTime = 1500;

export default class Game extends AbstractGame implements IGame {

  constructor(stage: IStage) {
    super(stage);
    this.global.activeMap = 0;
  }

  public titleScreen(): void {
    this.global.finalCanvas.clearCanvas();
    TextWriter.writeMainMessage("Sarah's Platforms", 'white');
    TextWriter.writeSubMessage("Press space to begin", 'white');
    if (this.global.keyboard.state.space) {
      this.global.gameState = GameState.ResetStage;
    }
  }

  public beforeStage(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime) {
      this.drawStageAndStatusBar(false);
      TextWriter.writeMainMessage(`Stage ${this.global.activeMap + 1}. Get ready!`, 'white');
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
      TextWriter.writeMainMessage('Stage completed!', 'white');
    } else {
      this.global.activeMap++;
      this.global.gameState = GameState.ResetStage;
      if (this.global.activeMap === this.global.maps.length) {
        this.global.gameState = GameState.GameCompleted;
      }
    }
  }

  public gameCompleted(): void {
    if (this.global.getTimeSinceLastStateChange() < waitingTime * 1.6) {
      this.global.finalCanvas.clearCanvas();
      TextWriter.writeMainMessage('You finished the game!', 'white');
    } else {
      this.newGame();
      this.global.gameState = GameState.TitleScreen;
    }
  }

  public dead(): void {
  }

  public resetGame(): void {
    this.drawStageAndStatusBar(false);
    TextWriter.writeMainMessage('Reset stage?', 'white');
    if (this.global.keyboard.state.yes) {
      this.global.gameState = GameState.ResetStage;
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
