import global from '../lib/Global';

const defaultStatusBarColor = "#FFFFFF";
const defaultTextFillColor = "#FFCF40";
const defaultTextStrokeColor = "#A67C00";

export default class TextWriter {
  constructor() {}

  public static writeStatusBar(text: string, horizontalAlignment: string = 'left', statusBarColor: string = defaultStatusBarColor) {
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

  public static writeMainMessage(message: string, textFillColor: string = defaultTextFillColor, textStrokeColor: string = defaultTextStrokeColor) {
    const x = (global.config.unit * global.config.gridWidth) / 2;
    const y = (global.config.unit * global.config.gridHeight) / 2;
    global.canvas.write(
      message,
      textFillColor, textStrokeColor,
      40, y, x
    );
  }

  public static writeSubMessage(message: string, textFillColor: string = defaultTextFillColor, textStrokeColor: string = defaultTextStrokeColor) {
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
