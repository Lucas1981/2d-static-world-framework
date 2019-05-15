import global from './Global';

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

  getGrid() {
    return this.grid;
  }

  isSafe(x, y) {
    const tile = this.grid[y + 1][x + 1];
    return tile !== null && this.tiles[tile].type === 'background';
  }

  draw() {
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
}
