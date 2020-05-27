import Canvas from './Canvas';
import Clock from './Clock';
import NextAnimationFrameFactory from './NextAnimationFrameFactory.js';
import KeyboardInput from './KeyboardInput';
import Generator from './Generator';
import MainLoop from './MainLoop';
import { IGame } from './IGame';
import { IStage } from './IStage';
import { GameState } from './GameState.ts';
import Sound from './Sound';
import global from './Global';

const showFps = false;

export default abstract class AbstractGame implements IGame {
  public canvas: Canvas;
  public request: any;
  public gameState: GameState;
  public mainLoop: MainLoop;
  public global: any;
  public Generator: any;

  constructor(stage: IStage) {
    this.request = NextAnimationFrameFactory.getRequest();
    this.mainLoop = new MainLoop(stage);
    this.global = global;
    this.Generator = Generator;
  }

  public async run(data: any, actorAttributes: any) {
    await this.initiate(data, actorAttributes);
    global.clock.setTime();
    this.loop(); // Kick it into gear
  }

  public titleScreen(): void {}
  public beforeStage(): void {}
  public stage(): void { this.mainLoop.run(); }
  public stageCompleted(): void {}
  public gameCompleted(): void {}
  public dead(): void {}
  public gameOver(): void {}
  public resetStage(): void {}
  public resetGame(): void {}

  private loop(): void {
    global.clock.setTime();
    if(showFps) console.log(`${Math.floor(1000 / global.clock.elapsedTime)}fps`);
    switch(global.gameState) {
      case GameState.TitleScreen:
        // Do what needs to be done in the title screen
        this.titleScreen();
        break;
      case GameState.BeforeStage:
        // Do what needs to be done before the gameplay starts
        this.beforeStage();
        break;
      case GameState.Stage:
        this.stage();
        break;
      case GameState.StageCompleted:
        this.stageCompleted();
        break;
      case GameState.GameCompleted:
        this.gameCompleted();
        break;
      case GameState.Dead:
        this.dead();
        break;
      case GameState.GameOver:
        this.gameOver();
        break;
      case GameState.ResetStage:
        this.resetStage();
        break;
      case GameState.ResetGame:
        this.resetGame();
        break;
      default:
        throw new Error("Unknown game state");
    }
    this.request.call(window, this.loop.bind(this));
  }

  public async initiate(data: any, actorAttributes: any) {
    global.gameData = data;
    global.gameState = GameState.TitleScreen;
    global.actorAttributes = actorAttributes;
    global.config = data.config;
    global.config.cameraWidth = global.config.cameraWidth || global.config.unit * global.config.gridWidth;
    global.config.cameraHeight = global.config.cameraHeight || global.config.unit * global.config.gridHeight;
    global.tiles = data.tiles;
    global.canvas = new Canvas(data.config.unit * (data.config.gridWidth + 2), data.config.unit * (data.config.gridHeight + 2), true);
    global.finalCanvas = new Canvas(data.config.cameraWidth, data.config.cameraHeight + data.config.unit);
    global.sound = await Generator.getSounds(data);
    global.animations = await Generator.getAnimations(data);
    global.keyboard = new KeyboardInput();
    global.maps = Generator.getMaps(data, actorAttributes);
    global.activeMap = 0;
  }
}
