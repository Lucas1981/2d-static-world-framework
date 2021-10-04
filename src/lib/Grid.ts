import global from './Global';

const defaultBandMargin = 0;

export default class Grid {

  private grid: Array<Array<number>>;
  private context: any;

  constructor(
    private width: number,
    private height: number,
    private unit: number,
    private tiles: Array<any>,
    private map: Array<Array<number>>,
    private backgroundColor: String = null
  ) {
    this.context = global.canvas.getContext();

    // First, initiate with solid null values
    this.grid = new Array(this.height + 3);
    for(let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.width + 3).fill(null);
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

  public getTile(x: number, y: number) {
    const tile = this.grid[y + 1][x + 1];
    if (tile === null || !('animation' in this.tiles[tile])) return null;
    return this.tiles[tile];
  }

  public isSafe(x: number, y: number) {
    const tile = this.grid[y + 1][x + 1];
    return tile !== null && this.tiles[tile].type === 'background';
  }

  public getAnimation(x: number, y: number) {
    const tile = this.grid[y + 1][x + 1];
    if (tile === null || !('animation' in this.tiles[tile])) return null;
    return this.tiles[tile].animation;
  }

  public draw() {
    const cameraGridX = this.playerToGrid(global.cameraX);
    const cameraGridY = this.playerToGrid(global.cameraY);
    const widthInUnits = Math.floor(global.config.cameraWidth / global.config.unit);
    const heightInUnits = Math.floor(global.config.cameraHeight / global.config.unit);
    const restX = global.cameraX - (global.config.unit * cameraGridX);
    const restY = global.cameraY - (global.config.unit * cameraGridY);
    for(let x = cameraGridX; x <= widthInUnits + cameraGridX + 1; x++) {
      for(let y = cameraGridY; y <= heightInUnits + cameraGridY + 1; y++) {
        const tile = this.grid[y][x];
        if (tile === null || !('animation' in this.tiles[tile])) continue;

        const finalX = ((x - cameraGridX) * this.unit) - Math.floor(restX);
        const finalY = ((y - cameraGridY) * this.unit) - Math.floor(restY);
        global.animations.data[this.tiles[tile].animation].draw(
          this.context, finalX, finalY, global.clock.elapsedTime
        );

        if (global.debug) {
          global.canvas.drawRubberBand(
            finalX, finalY, this.unit, this.unit, 'red'
          );
        }
      }
    }
  }

  public gridReport(probeX: number, probeY: number, width: number = 0, height: number = 0, bandMargin: number = defaultBandMargin): any {
    const { topLeft, bottomLeft, topRight, bottomRight } = this.checkGrid(probeX, probeY, width, height, bandMargin);

    return [
      topLeft,
      topRight,
      bottomRight,
      bottomLeft
    ];
  }

  public checkGrid(probeX: number, probeY: number, width: number = 0, height: number = 0, bandMargin: number = defaultBandMargin, showTiles = false): any {
    const unit = global.config.unit;
    const grid = global.maps[global.activeMap].grid;
    const probes = this.getProbes(probeX, probeY, width, height, bandMargin);
    const {
      probeLeftHorizontalBand, probeRightHorizontalBand, probeTopHorizontalBand, probeBottomHorizontalBand,
      probeLeftVerticalBand, probeRightVerticalBand, probeTopVerticalBand, probeBottomVerticalBand,
    } = probes;

    const corners = {
      topLeft:
        grid.isSafe(probeLeftHorizontalBand, probeTopHorizontalBand) &&
        grid.isSafe(probeLeftVerticalBand, probeTopVerticalBand),
      bottomLeft:
        grid.isSafe(probeLeftHorizontalBand, probeBottomHorizontalBand) &&
        grid.isSafe(probeLeftVerticalBand, probeBottomVerticalBand),
      topRight:
        grid.isSafe(probeRightHorizontalBand, probeTopHorizontalBand) &&
        grid.isSafe(probeRightVerticalBand, probeTopVerticalBand),
      bottomRight:
        grid.isSafe(probeRightHorizontalBand, probeBottomHorizontalBand) &&
        grid.isSafe(probeRightVerticalBand, probeBottomVerticalBand),
    };

    // Make the probing tiles visible
    if (global.debug && showTiles) { this.showDebugOverlay(probes, corners); }

    return {
      ...corners,
      top: corners.topLeft && corners.topRight,
      bottom: corners.bottomLeft && corners.bottomRight,
      left: corners.topLeft && corners.bottomLeft,
      right: corners.topRight && corners.bottomRight,
      all: corners.topRight && corners.bottomRight && corners.topLeft && corners.bottomLeft
    };
  }

  public getProbes(probeX: number, probeY: number, width: number = 0, height: number = 0, bandMargin: number = defaultBandMargin): any {
    const halfUnit = global.config.unit / 2;
    const left = this.playerToGrid(probeX - halfUnit);
    const right = this.playerToGrid(probeX - halfUnit + width - 1);
    const top = this.playerToGrid(probeY - halfUnit);
    const bottom = this.playerToGrid(probeY - halfUnit + height - 1);
    return {
      left,
      right,
      top,
      bottom,
      probeLeftHorizontalBand: left,
      probeRightHorizontalBand: right,
      probeTopHorizontalBand: this.playerToGrid(probeY - halfUnit + bandMargin),
      probeBottomHorizontalBand: this.playerToGrid(probeY - halfUnit + height - 1 - bandMargin),
      probeLeftVerticalBand: this.playerToGrid(probeX - halfUnit + bandMargin),
      probeRightVerticalBand: this.playerToGrid(probeX - halfUnit + width - 1 - bandMargin),
      probeTopVerticalBand: top,
      probeBottomVerticalBand: bottom
    }
  }

  public playerToGrid(value: number): number {
    return Math.floor(value / global.config.unit);
  }

  private showDebugOverlay(probes, corners) {
    const ctx = global.canvas.getContext();
    const unit = this.unit;
    const directions = [
      { key: 'topLeft', components: ['Top', 'Left'] },
      { key: 'topRight', components: ['Top', 'Right'] },
      { key: 'bottomLeft', components: ['Bottom', 'Left'] },
      { key: 'bottomRight', components: ['Bottom', 'Right']}
    ];
    for (let i = 0; i < directions.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = corners[directions[i].key] ? 'green' : 'red';
      ctx.rect(
        probes[`probe${directions[i].components[1]}HorizontalBand`] * unit,
        probes[`probe${directions[i].components[0]}HorizontalBand`] * unit,
        unit, unit
      );
      ctx.fill();
      ctx.closePath();
    }
  }
}
