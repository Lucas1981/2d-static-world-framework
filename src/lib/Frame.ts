import Canvas from './Canvas';

const contourCollisionDebug = false;

export default class Frame {
  private _boundingBox = {};

  constructor(
    private image: any,
    public offsetX: number,
    public offsetY: number,
    public width: number,
    public height: number,
    public contour: any = {
      top: [],
      left: [],
      bottom: [],
      right: []
    },
  ) {
    this._boundingBox = {
      top: contour.top.findIndex(record => record < height),
      bottom: height - [...contour.bottom].reverse().findIndex(record => record > -1),
      left: contour.left.findIndex(record => record < width),
      right: width - [...contour.right].reverse().findIndex(record => record > - 1)
    }
  }

  public get boundingBox() { return this._boundingBox; }

  public draw(ctx: any, x: number, y: number): void {
    ctx.drawImage(
      this.image, // image
      this.offsetX, this.offsetY, this.width, this.height, // source
      x, y, this.width, this.height // destination
    );

    if (contourCollisionDebug) {
      if (!this.contour) return;
      for (let i = 0; i < this.height; i++) {
        // if (this.contour.top[i] === 64 && this.contour.bottom[i] === -1) continue;
        ctx.beginPath();
        ctx.moveTo(x + this.contour.left[i], y + i);
        ctx.lineTo(x + this.contour.right[i], y + i);
        ctx.strokeStyle = "rgba(255, 0, 0, .5)";
        ctx.closePath();
        ctx.stroke();
      }

      for (let col = 0; col < this.width; col++) {
        if (this.contour.top[col] === 64 || this.contour.bottom[col] === -1) continue;
        ctx.beginPath();
        ctx.moveTo(x + col, y + this.contour.top[col]);
        ctx.lineTo(x + col, y + this.contour.bottom[col]);
        ctx.strokeStyle = "rgba(0, 0, 255, .5)";
        ctx.closePath();
        ctx.stroke();
      }
    }
  }
}
