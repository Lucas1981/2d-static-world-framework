import IProgress from './actor/IProgress';
import Frame from './Frame';
import Animation from './Animation';
import LinkedList from './LinkedList';
import Canvas from './Canvas';
import Grid from './Grid';
import Actor from './actor/Actor';
import Sound from './Sound';
import IThreat from './actor/IThreat';
import IMovable from './actor/IMovable';
import IActionable from './actor/IActionable';
import IVolition from './actor/IVolition';
import IVulnerable from './actor/IVulnerable';
import IStateChange from './actor/IStateChange';
import actorOptions from './actor/actor-options';
import global from './Global';

export default class Generator {
  constructor() {}

  public static getMaps(data: any, actorAttributes: any): any {
    const result: any = [];

    for(const map of data.maps) {
      const grid: Grid = Generator.getGrid(map, data);
      const actors: LinkedList = Generator.getActors(map.actors, data, actorAttributes);
      result.push({ grid, actors });
    }

    return result;
  }

  public static reloadMap(map: any, data: any, actorAttributes: any) {
    const grid: Grid = Generator.getGrid(map, data);
    const actors: LinkedList = Generator.getActors(map.actors, data, actorAttributes);
    return { grid, actors };
  }

  public static getActors(actors: any, data: any, actorAttributes: any): LinkedList {
    const result: LinkedList = new LinkedList();
    for (let actor of actors) {
      const actorType: any = data.actors[actor.type];
      const customAttributes: any = actorAttributes[actorType.name];
      const progress: IProgress[] = [];
      for (let i = 0; i < actorAttributes[actorType.name].progress.length; i++) {
        progress.push(new actorAttributes[actorType.name].progress[i]());
      }
      result.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x + Math.floor(data.config.unit / 2),
        actor.y + Math.floor(data.config.unit / 2),
        actor.condition,
        actor.direction,
        actorType.states,
        progress,
        new actorAttributes[actorType.name].stateChanger(),
        new ('movable' in customAttributes ? customAttributes.movable : actorOptions[actorType.movable])(),
        new ('threat' in customAttributes ? customAttributes.threat : actorOptions[actorType.threat])(),
        new ('volition' in customAttributes ? customAttributes.volition : actorOptions[actorType.volition])(),
        new ('vulnerable' in customAttributes ? customAttributes.vulnerable : actorOptions[actorType.vulnerable])(),
        new ('actionable' in customAttributes ? customAttributes.actionable : actorOptions[actorType.actionable])()
      ));
    }
    return result;
  }

  public static addActor(
    x: number, y: number, state: number, direction: number, states: any[],
    progress: IProgress[], stateChanger: IStateChange, movable: IMovable,
    harmful: IThreat, malevolent: IVolition, vulnerable: IVulnerable,
    active: IActionable
  ) {
    global.maps[global.activeMap].actors.push(new Actor(
      // Make sure to correct for the offset of half a unit
      x, y, state, direction, states,
      progress, stateChanger, movable, harmful,
      malevolent, vulnerable, active
    ));
  }

  public static getGrid(map: any, data: any): Grid {
    const grid: Grid = new Grid(
      data.config.gridWidth,
      data.config.gridHeight,
      data.config.unit,
      data.tiles,
      // Keep it backwards compatible for single-layered maps
      map.grid[0][0].length ? map.grid : [map.grid],
      map.backgroundColor || null
    );
    return grid;
  }

  public static async getSounds(data: any): Promise<any> {
    const sound: Sound = new Sound();
    return new Promise((resolve, reject) => {
      let promises = []
      for (const key in data.sounds) {
        const value = data.sounds[key];
        promises.push(sound.registerSample(key, value));
      }
      Promise.all(promises).then(() => resolve(sound));
    });
  }

  public static async getAnimations(data: any): Promise<any> {
    const promise: any = new Promise((resolve, reject) => {
      const image: any = new Image();
      let canvas: Canvas;
      /* 1. Load the image source */

      image.src = data.imageData;
      image.onload = () => {
        const frames: Array<Frame> = new Array<Frame>();
        const result: any = [];
        canvas = new Canvas(image.width, image.height, true);
        canvas.getContext().drawImage(image, 0, 0);

        /* 2. Make an inventory of all the frames */

        for (const frame of data.frames) {
          frames.push(new Frame(
            image,
            frame.x, frame.y, frame.width, frame.height,
            frame.contour || null
          ));
        }

        /* 3. Create a map of all the animations */

        for(let i = 0; i < data.animations.length; i++) {
          result.push(new Animation(
            frames,
            data.animations[i].data,
            data.animations[i].loopType,
            data.config.framesPerSecond || 8,
            'boundingBox' in data.animations[i] ? data.animations[i].boundingBox : null,
          ));
        }

        /* Expose the result */

        resolve({
          canvas,
          data: result
        });
      }
    });

    return promise;
  }
}
