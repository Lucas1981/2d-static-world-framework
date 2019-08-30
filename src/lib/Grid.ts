import global from './Global';

const defaultBandMargin = 3;

export default class Grid {

  private grid: Array<Array<number>>;
  private context: any;

  constructor(
    private width: number,
    private height: number,
    private unit: number,
    private tiles: Array<any>,
    private map: Array<Array<number>>,
  ) {
    this.context = global.canvas.getContext();

    // First, initiate with solid null values
    this.grid = new Array(this.height + 2);
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.width + 2).fill(null);
    }

    // Then add the actual maps
    for (let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        this.grid[y + 1][x + 1] = this.map[y][x];
      }
    }
  }

  public getGrid() {
    return this.grid;
  }

  public isSafe(x: number, y: number) {
    const tile = this.grid[y + 1][x + 1];
    return tile !== null && this.tiles[tile].type === 'background';
  }

  public draw() {
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        const tile = this.grid[y + 1][x + 1];
        global.animations.data[this.tiles[tile].animation].draw(
          this.context,
          x * this.unit,
          y * this.unit,
          global.clock.elapsedTime
        );
      }
    }
  }

  public checkGrid(probeX: number, probeY: number): Boolean {
    const coordinates = this.getProbeCoordinates(probeX, probeY);
    return this.checkGridCoordinates(coordinates);
  }

  public checkBandGrid(probeX: number, probeY: number, bandMargin: number = defaultBandMargin): Boolean {
    const coordinates = this.getBandProbeCoordinates(probeX, probeY, bandMargin);
    return this.checkGridCoordinates(coordinates);
  }

  private checkGridCoordinates(coordinates) {
    for (const coordinate of coordinates) {
      if (coordinate === false) return false;
    }
    return true;
  }

  public gridReport(probeX: number, probeY: number): any {
    return this.getProbeCoordinates(probeX, probeY);
  }

  public getProbes(probeX: number, probeY: number): any {
    return {
      probeLeft: this.playerToGrid(probeX - (global.config.unit / 2)),
      probeRight: this.playerToGrid(probeX + (global.config.unit / 2) - 1),
      probeTop: this.playerToGrid(probeY - (global.config.unit / 2)),
      probeBottom: this.playerToGrid(probeY + (global.config.unit / 2) - 1),
    }
  }

  public getBandProbes(probeX: number, probeY: number, bandMargin: number = defaultBandMargin): any {
    return {
      probeLeftHorizontalBand: this.playerToGrid(probeX - (global.config.unit / 2)),
      probeRightHorizontalBand: this.playerToGrid(probeX + (global.config.unit / 2) - 1),
      probeTopHorizontalBand: this.playerToGrid(probeY - (global.config.unit / 2) + bandMargin),
      probeBottomHorizontalBand: this.playerToGrid(probeY + (global.config.unit / 2) - 1 - bandMargin),

      probeLeftVerticalBand: this.playerToGrid(probeX - (global.config.unit / 2) + bandMargin),
      probeRightVerticalBand: this.playerToGrid(probeX + (global.config.unit / 2) - 1 - bandMargin),
      probeTopVerticalBand: this.playerToGrid(probeY - (global.config.unit / 2)),
      probeBottomVerticalBand: this.playerToGrid(probeY + (global.config.unit / 2) - 1)
    }
  }

  private getProbeCoordinates(probeX: number, probeY: number): any {
    const { probeLeft, probeRight, probeTop, probeBottom } = this.getProbes(probeX, probeY);

    return [
      global.maps[global.activeMap].grid.isSafe(probeLeft, probeTop),
      global.maps[global.activeMap].grid.isSafe(probeRight, probeTop),
      global.maps[global.activeMap].grid.isSafe(probeRight, probeBottom),
      global.maps[global.activeMap].grid.isSafe(probeLeft, probeBottom)
    ];
  }

  private getBandProbeCoordinates(probeX: number, probeY: number, bandMargin: number): any {
    const {
      probeLeftHorizontalBand, probeRightHorizontalBand, probeTopHorizontalBand, probeBottomHorizontalBand,
      probeLeftVerticalBand, probeRightVerticalBand, probeTopVerticalBand, probeBottomVerticalBand,
    } = this.getBandProbes(probeX, probeY, bandMargin);

    return [
      global.maps[global.activeMap].grid.isSafe(probeLeftHorizontalBand, probeTopHorizontalBand),
      global.maps[global.activeMap].grid.isSafe(probeRightHorizontalBand, probeTopHorizontalBand),
      global.maps[global.activeMap].grid.isSafe(probeRightHorizontalBand, probeBottomHorizontalBand),
      global.maps[global.activeMap].grid.isSafe(probeLeftHorizontalBand, probeBottomHorizontalBand),

      global.maps[global.activeMap].grid.isSafe(probeLeftVerticalBand, probeTopVerticalBand),
      global.maps[global.activeMap].grid.isSafe(probeRightVerticalBand, probeTopVerticalBand),
      global.maps[global.activeMap].grid.isSafe(probeRightVerticalBand, probeBottomVerticalBand),
      global.maps[global.activeMap].grid.isSafe(probeLeftVerticalBand, probeBottomVerticalBand),
    ];
  }

  private playerToGrid(value: number): number {
    return Math.floor(value / global.config.unit);
  }
}
