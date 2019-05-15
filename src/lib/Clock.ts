export default class Clock {
  private prevTime: any;
  private time: any;

  constructor() {
    this.time = new Date();
    this.prevTime = this.time;
  }

  public getTime(): any {
    return this.time;
  }

  public getPrevTime(): any {
    return this.prevTime;
  }

  public get elapsedTime(): any {
    return this.time - this.prevTime;
  }

  public setTime(): void {
    this.prevTime = this.time;
    this.time = new Date();
  }
}
