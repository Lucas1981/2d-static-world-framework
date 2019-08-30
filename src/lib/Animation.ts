import { LOOP_TYPES } from './constants.ts';
import Frame from './Frame.ts';

export default class Animation {
  private numberOfFrames: number;

  constructor(
    private frames: Array<Frame>,
    private indices: Array<number>,
    private loopType: number,
    private framesPerSecond: number,
    private boundingBox: any
  ) {
    this.numberOfFrames = this.indices.length;
  }

  public draw(ctx: any, x: number, y: number, elapsedTime: any = 0, animate: boolean = true): void {
    const index: number = animate ? this.determineFrame(elapsedTime): 0;
    this.frames[this.indices[index]].draw(ctx, x, y);
  }

  public getCurrentFrame(elapsedTime: any = 0) {
    const index: number = this.determineFrame(elapsedTime);
    const frame: Frame = this.frames[this.indices[index]];
    return frame;
  }

  private determineFrame(elapsedTime: any): number {
    const frameNumber: number = Math.floor(elapsedTime * this.framesPerSecond / 1000)
    let index: number;

    switch(this.loopType) {
      case LOOP_TYPES.singleFrame:
        index = 0;
        break;
      case LOOP_TYPES.noLoop:
        if (frameNumber > this.numberOfFrames) {
          index = this.numberOfFrames
        } else {
          index = frameNumber;
        }
        break;
      case LOOP_TYPES.loop:
        index = frameNumber % this.numberOfFrames;
        break;
      case LOOP_TYPES.loopBackAndForth:
        index = this.determineBackAndForthFrame(frameNumber);
        break;
      default:
        throw "Error: Unknown loop type";
    }
    return index;
  }

  private determineBackAndForthFrame(frameNumber: number): number {
    const breakpoint: number = Math.floor(this.numberOfFrames * 1.5);
    const compFrame: number = frameNumber % breakpoint;
    return compFrame >= this.numberOfFrames ? breakpoint - compFrame : compFrame;
  }
};
