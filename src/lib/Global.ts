import Canvas from './Canvas';
import Clock from './Clock'
import KeyboardInput from './KeyboardInput';
import Grid from './Grid';
import LinkedList from './LinkedList';
import Sound from './Sound';
import PubSub from './PubSub';
import { GameState } from './GameState';

const debug = false;

class Global {
    private static singleton: Global = null
    private _config: any = null;
    private _clock: Clock = null;
    private _canvas: Canvas = null;
    private _animations: any = null;
    private _keyboard: KeyboardInput = null;
    private _maps: any[] = null;
    private _tiles: any[] = null;
    private _actors: LinkedList = null;
    private _gameState: GameState = null;
    private _activeMap: number = null;
    private _gameData: any = null;
    private _actorAttributes: any = null;
    private lastGameStateChange: any = null;
    private _sound: Sound = null;
    private _pubsub: PubSub = null;
    private _debug: Boolean = debug;

    constructor() {
      // We need to do this immediately
      this._clock = new Clock();
      this._pubsub = new PubSub();
    }

    public get debug(): Boolean {
      return this._debug;
    }

    public get pubsub(): PubSub {
      return this._pubsub;
    }

    public set gameState(gameState: GameState) {
      this._gameState = gameState;
      this.lastGameStateChange = global.clock.getTime();
    }

    public get gameState(): GameState {
      return this._gameState;
    }

    public getTimeSinceLastStateChange(): number {
      const now = global.clock.getTime();
      return +now - this.lastGameStateChange;
    }

    public set config(config: any) {
      this._config = config;
    }

    public get config(): any {
      return this._config;
    }

    public set clock(clock: Clock) {
      this._clock = clock;
    }

    public get clock(): Clock {
      return this._clock;
    }

    public set canvas(canvas: Canvas) {
      this._canvas = canvas;
    }

    public get canvas(): Canvas {
      return this._canvas;
    }

    public get tiles(): any[] {
      return this._tiles;
    }

    public set tiles(tiles: any[]) {
      this._tiles = tiles;
    }

    public set animations(animations: any) {
      this._animations = animations;
    }

    public get animations(): any {
      return this._animations;
    }

    public set keyboard(keyboard: KeyboardInput) {
      this._keyboard = keyboard;
    }

    public get keyboard(): KeyboardInput {
      return this._keyboard;
    }

    public set maps(grid: any[]) {
      this._maps = grid;
    }

    public get maps(): any[] {
      return this._maps;
    }

    public set actors(actors: LinkedList) {
      this._actors = actors;
    }

    public get actors(): LinkedList {
      return this._actors;
    }

    public set sound(sound: Sound) {
      this._sound = sound;
    }

    public get sound(): Sound {
      return this._sound;
    }

    public get activeMap(): number {
      return this._activeMap;
    }

    public set activeMap(activeMap: number) {
      this._activeMap = activeMap;
    }

    public get gameData(): any {
      return this._gameData;
    }

    public set gameData(gameData: any) {
      this._gameData = gameData;
    }

    public get actorAttributes(): any {
      return this._actorAttributes;
    }

    public set actorAttributes(actorAttributes: any) {
      this._actorAttributes = actorAttributes;
    }
}

// Make it a singleton
const global = new Global();

export default global;
