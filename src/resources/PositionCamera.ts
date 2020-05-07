import IProgress from '../lib/actor/IProgress';
import Actor from '../lib/actor/Actor';
import global from '../lib/Global';

export default class PositionCamera implements IProgress {
    public progress(actor: Actor) {
      /* Adjust the camera position */

      // Set up the values we need to calculate
      const totalFieldWidth = global.config.gridWidth * global.config.unit;
      const totalFieldHeight = global.config.gridHeight * global.config.unit;
      const distancePlayerToLeft = actor.x; // the left edge is 0, so the x is all we need
      const distancePlayerToRight = totalFieldWidth - actor.x;
      const distancePlayerToTop = actor.y;
      const distancePlayerToBottom = totalFieldHeight - actor.y;
      const maximumCameraWidth = global.config.cameraWidth / 2;
      const maximumCameraHeight = global.config.cameraHeight / 2;

      // Let's assume all is well and we can just go ahead
      global.cameraX = actor.x - maximumCameraWidth;
      global.cameraY = actor.y - maximumCameraHeight;

      // Compare values and make necessary adjustments
      if (distancePlayerToLeft < maximumCameraWidth) global.cameraX = 0;
      if (distancePlayerToRight < maximumCameraWidth) global.cameraX = totalFieldWidth - global.config.cameraWidth;
      if (distancePlayerToTop < maximumCameraHeight) global.cameraY = 0;
      if (distancePlayerToBottom < maximumCameraHeight) global.cameraY = totalFieldHeight - global.config.cameraHeight;
    }
}
