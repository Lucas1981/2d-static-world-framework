import Frame from './Frame';
import Animation from './Animation';
import LinkedList from './LinkedList';
import Canvas from './Canvas';
import Grid from './Grid';
import Actor from './actor/Actor';
import Sound from './Sound';
import actorOptions from './actor/actor-options';

export default class Generator {
  constructor() {}

  public static getMaps(data, actorAttributes): any {
    const result: any = [];
    for(const map of data.maps) {
      const grid = Generator.getGrid(map, data);
      const actors = Generator.getActors(map.actors, data, actorAttributes);
      result.push({ grid, actors });
    }
    return result;
  }

  public static reloadMap(map, data, actorAttributes) {
    const grid = Generator.getGrid(map, data);
    const actors = Generator.getActors(map.actors, data, actorAttributes);
    return { grid, actors };
  }

  public static getActors(actors, data, actorAttributes): LinkedList {
    const result: LinkedList = new LinkedList();
    for (let actor of actors) {
      const actorType = data.actors[actor.type];
      const customAttributes = actorAttributes[actorType.name];
      result.push(new Actor(
        // Make sure to correct for the offset of half a unit
        actor.x + Math.floor(data.config.unit / 2),
        actor.y + Math.floor(data.config.unit / 2),
        actorType.states,
        new actorAttributes[actorType.name].progress(actor),
        new ('movable' in customAttributes ? customAttributes.movable : actorOptions[actorType.movable])(),
        new ('threat' in customAttributes ? customAttributes.threat : actorOptions[actorType.threat])(),
        new ('volition' in customAttributes ? customAttributes.volition : actorOptions[actorType.volition])(),
        new ('vulnerable' in customAttributes ? customAttributes.vulnerable : actorOptions[actorType.vulnerable])(),
        new ('actionable' in customAttributes ? customAttributes.actionable : actorOptions[actorType.actionable])()
      ));
    }
    return result;
  }

  public static getGrid(map, data): Grid {
    const grid = new Grid(
      data.config.gridWidth,
      data.config.gridHeight,
      data.config.unit,
      data.tiles,
      map.grid
    );
    return grid;
  }

  public static async getSounds(data): Promise<any> {
    const sound = new Sound();
    return new Promise((resolve, reject) => {
      for (const key in data.sounds) {
        const value = data.sounds[key];
        sound.registerSample(key, value);
      }
      resolve(sound);
    });
  }

  public static async getAnimations(data): Promise<any> {
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
            frame.x, frame.y, frame.width, frame.height
          ));
        }

        /* 3. Create a map of all the animations */

        for(let i = 0; i < data.animations.length; i++) {
          result.push(new Animation(
            frames,
            data.animations[i].data,
            data.animations[i].loopType,
            data.config.framesPerSecond || 8,
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
