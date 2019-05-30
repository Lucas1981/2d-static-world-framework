import global from '../lib/Global';

const statusBarColor = "#FFFFFF";
const textFillColor = "#FFCF40";
const textStrokeColor = "#A67C00";

export default class TextWriter {
  constructor() {}

  public static writeStatusBar(text: string, horizontalAlignment: string = 'left') {
    global.canvas.clearRect(
      0,
      global.config.unit * global.config.gridHeight,
      global.config.unit * global.config.gridWidth,
      (global.config.unit * 3) * global.config.gridHeight,
    )
    global.canvas.write(
      text,
      statusBarColor,
      statusBarColor,
      24,
      global.config.unit * global.config.gridHeight + 20,
      horizontalAlignment === 'left' ? 0 : (global.config.gridWidth * global.config.unit),
      horizontalAlignment
    );
  }

  public static writeMainMessage(message) {
    const x = (global.config.unit * global.config.gridWidth) / 2;
    const y = (global.config.unit * global.config.gridHeight) / 2;
    global.canvas.write(
      message,
      textFillColor, textStrokeColor,
      40, y, x
    );
  }

  public static writeSubMessage(message) {
    global.canvas.write(
      message,
      textFillColor,
      textStrokeColor,
      20, 320
    );
  }

  public static clearStatusBar() {
    global.canvas.clearRect(
      0,
      global.config.unit * global.config.gridHeight,
      global.config.unit * global.config.gridWidth,
      (global.config.unit * 3) * global.config.gridHeight,
    )
  }
};
