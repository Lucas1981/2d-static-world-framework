const BACKGROUND = '#000000';

export default class Canvas {

  private canvasPointer: any;
  private context: any;

  constructor(maxWidth, maxHeight, offsite = false, id = 'canvas', background = BACKGROUND) {
    this.canvasPointer = offsite ? document.createElement('canvas') : document.getElementById(id);
    this.context = this.canvasPointer.getContext("2d");
    this.canvasPointer.width = maxWidth;
    this.canvasPointer.height = maxHeight;
  }

  public get width(): number {
    return this.canvasPointer.width;
  }

  public get height(): number {
    return this.canvasPointer.height;
  }

  public write(
    text: string,
    textFillColor,
    textStrokeColor,
    size: number = 40,
    y: number = this.height / 2,
    x: number = this.width / 2,
    direction: string = 'center',
    stroke: boolean = false
  ): void {
    this.context.font = `${size}px "MyArcade"`;
    this.context.strokeStyle = textStrokeColor;
    this.context.fillStyle = textFillColor;
    this.context.textAlign = direction;
    this.context.lineWidth = 1;
    this.context.fillText(text, x, y);
    if (stroke) this.context.strokeText(text, x, y);
  }

  public getContext(): any {
    return this.context;
  }

  public getImageData(): any {
    return this.context.getImageData(0, 0, this.canvasPointer.width, this.canvasPointer.height);
  }

  public clearRect(sx, sy, dx, dy, color = BACKGROUND) {
    this.context.fillStyle = color;
    this.context.fillRect(sx, sy, dx, dy);
  }

  public clearCanvas(backgroundColor = BACKGROUND): any {
    this.context.fillStyle = backgroundColor;
    this.context.fillRect(0, 0, this.canvasPointer.width, this.canvasPointer.height);
  }
};
