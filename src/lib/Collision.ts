import Actor from './Actor';
import Frame from './Frame';
import global from './Global';

export default class Collision {

  constructor() {}

  public static isColliding(source: Actor, target: Actor): boolean {
    if (
      Collision.squareBoxCollision(source, target) &&
      Collision.pixelCollision(source, target)
    ) {
      return true;
    }
    return false;
  }

  private static squareBoxCollision(sourcePlayer: Actor, targetPlayer: Actor): boolean {

    const source = sourcePlayer.getCurrentBox();
    const target = targetPlayer.getCurrentBox();

    const sx1 = source.x;
    const sy1 = source.y;
    const sx2 = sx1 + source.width;
    const sy2 = sy1 + source.height;

    const dx1 = target.x;
    const dy1 = target.y;
    const dx2 = dx1 + target.width;
    const dy2 = dy1 + target.height;

    if(
      (
        /* Does the starting point fall in the domain? */
        ( sx1 <= dx1 && sx2 >= dx1 ) ||
        /* Does the endpoint fall in the domain? */
        ( sx1 <= dx2 && sx2 >= dx2 ) ||
        /* Do both points fall in the domain? */
        ( dx1 <= sx1 && dx2 >= sx2)
      )

      &&

      (
        /* Does the starting point fall in the domain? */
        ( sy1 <= dy1 && sy2 >= dy1 ) ||
        /* Does the endpoint fall in the domain? */
        ( sy1 <= dy2 && sy2 >= dy2 ) ||
        /* Do both points fall in the domain? */
        ( dy1 <= sy1 && dy2 >= sy2)
      )

    ) {
      return true;
    }

    return false;
  }


  private static pixelCollision(sourcePlayer: Actor, targetPlayer: Actor): boolean {

    let source: any = sourcePlayer.getCurrentBox();
    let target: any = targetPlayer.getCurrentBox();
    let sourceFrame: Frame = sourcePlayer.getCurrentFrame();
    let targetFrame: Frame = targetPlayer.getCurrentFrame();
    let imageData: any = global.animations.canvas.getImageData();
    let width: number = 0;
    let height: number = 0;
    let top: any = null;
    let bottom: any = null;
    let left: any = null;
    let right: any = null;

    /* 1. Isolate the part where there is overlap */

    /* a. Determine the starting points for each player */
    source.startX = source.x > target.x ? 0 : target.x - source.x;
    target.startX = target.x > source.x ? 0 : source.x - target.x;
    source.startY = source.y > target.y ? 0 : target.y - source.y;
    target.startY = target.y > source.y ? 0 : source.y - target.y;

    /* b. Determine how big the overlap is */
    left = source.startX === 0 ? target : source;
    right = source.startX === 0 ? source : target;
    width = left.width - left.startX < right.width ? left.width - left.startX : right.width;

    top = source.startY === 0 ? target : source;
    bottom = source.startY === 0 ? source : target;
    height = top.height - top.startY < bottom.height ? top.height - top.startY : bottom.height;

    /* 2. Compare the frames and see if collision occurs */

    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {

        /* Calculate the row for the source image */
        let sourceBase: number = (sourceFrame.offsetY + source.startY + j) * imageData.width * 4;
        let sourceIncrease: number = (sourceFrame.offsetX + source.startX + i) * 4;

        /* Check if the source is flipped */
        sourceBase += sourceIncrease;

        let targetBase: number = ((targetFrame.offsetY + target.startY + j) * imageData.width * 4);
        let targetIncrease: number = ( (targetFrame.offsetX + target.startX + i) * 4);

        targetBase += targetIncrease;

        if(imageData.data[sourceBase + 3] !== 0 && imageData.data[targetBase + 3] !== 0) {
          return true;
        }
      }
    }

    return false;
  }
};
