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

  public isSafe(x: number, y: number) {
    const tile = this.grid[y + 1][x + 1];
    return tile !== null && this.tiles[tile].type === 'background';
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

  public checkGrid(probeX: number, probeY: number, width: number = 0, height: number = 0, bandMargin: number = defaultBandMargin, showTiles = false): any {
    const unit = global.config.unit;
    const probes = this.getProbes(probeX, probeY, width, height, bandMargin);
    const {
      probeLeftHorizontalBand, probeRightHorizontalBand, probeTopHorizontalBand, probeBottomHorizontalBand,
      probeLeftVerticalBand, probeRightVerticalBand, probeTopVerticalBand, probeBottomVerticalBand,
    } = probes;

    const corners = {
      topLeft:
        global.maps[global.activeMap].grid.isSafe(probeLeftHorizontalBand, probeTopHorizontalBand) &&
        global.maps[global.activeMap].grid.isSafe(probeLeftVerticalBand, probeTopVerticalBand),
      bottomLeft:
        global.maps[global.activeMap].grid.isSafe(probeLeftHorizontalBand, probeBottomHorizontalBand) &&
        global.maps[global.activeMap].grid.isSafe(probeLeftVerticalBand, probeBottomVerticalBand),
      topRight:
        global.maps[global.activeMap].grid.isSafe(probeRightHorizontalBand, probeTopHorizontalBand) &&
        global.maps[global.activeMap].grid.isSafe(probeRightVerticalBand, probeTopVerticalBand),
      bottomRight:
        global.maps[global.activeMap].grid.isSafe(probeRightHorizontalBand, probeBottomHorizontalBand) &&
        global.maps[global.activeMap].grid.isSafe(probeRightVerticalBand, probeBottomVerticalBand),
    };

    // Make the probing tiles visible
    if (global.debug && showTiles) {
      const ctx = global.canvas.getContext();
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

    return {
      topLeft: corners.topLeft,
      topRight: corners.topRight,
      bottomLeft: corners.bottomLeft,
      bottomRight: corners.bottomRight,
      top: corners.topLeft && corners.topRight,
      bottom: corners.bottomLeft && corners.bottomRight,
      left: corners.topLeft && corners.bottomLeft,
      right: corners.topRight && corners.bottomRight,
      all: corners.topRight && corners.bottomRight && corners.topLeft && corners.bottomLeft
    };
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

  public getProbes(probeX: number, probeY: number, width: number = 0, height: number = 0, bandMargin: number = defaultBandMargin): any {
    const halfUnit = global.config.unit / 2;

    return {
      probeLeftHorizontalBand: this.playerToGrid(probeX - halfUnit),
      probeRightHorizontalBand: this.playerToGrid(probeX - halfUnit + width - 1),
      probeTopHorizontalBand: this.playerToGrid(probeY - halfUnit + bandMargin),
      probeBottomHorizontalBand: this.playerToGrid(probeY - halfUnit + height - 1 - bandMargin),
      probeLeftVerticalBand: this.playerToGrid(probeX - halfUnit + bandMargin),
      probeRightVerticalBand: this.playerToGrid(probeX - halfUnit + width - 1 - bandMargin),
      probeTopVerticalBand: this.playerToGrid(probeY - halfUnit),
      probeBottomVerticalBand: this.playerToGrid(probeY - halfUnit + height - 1)
    }
  }

  private playerToGrid(value: number): number {
    return Math.floor(value / global.config.unit);
  }
}
