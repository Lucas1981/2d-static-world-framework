const BACKGROUND = '#000000';

export default class Canvas {

  private canvasPointer: any;
  private context: any;

  constructor(maxWidth: number, maxHeight: number, offsite: Boolean = false, id: string = 'canvas', background: string = BACKGROUND) {
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

  public drawCircle(x: number, y: number, radius: number = 10, color: any = 'red') {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  public write(
    text: string,
    textFillColor: any,
    textStrokeColor: any,
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

  public getCanvas(): any {
    return this.canvasPointer;
  }

  public getContext(): any {
    return this.context;
  }

  public getImageData(): any {
    return this.context.getImageData(0, 0, this.canvasPointer.width, this.canvasPointer.height);
  }

  public clearRect(sx: number, sy: number, dx: number, dy: number, color: any = BACKGROUND) {
    this.context.fillStyle = color;
    this.context.fillRect(sx, sy, dx, dy);
  }

  public clearCanvas(backgroundColor: any = BACKGROUND): any {
    this.context.fillStyle = backgroundColor;
    this.context.fillRect(0, 0, this.canvasPointer.width, this.canvasPointer.height);
  }

  public copyToCanvas(canvas: Canvas, x, y, w, h) {
    this.context.drawImage(canvas.getCanvas(), x, y, w, h, 0, 0, w, h);
  }
};
