import global from '../lib/Global';

const defaultStatusBarColor = "#FFFFFF";
const defaultTextFillColor = "#FFCF40";
const defaultTextStrokeColor = "#A67C00";

export default class TextWriter {
  constructor() {}

  public static writeStatusBar(text: string, horizontalAlignment: string = 'left', statusBarColor: string = defaultStatusBarColor) {
    this.clearStatusBar();
    global.finalCanvas.write(
      text,
      statusBarColor,
      statusBarColor,
      24,
      global.config.cameraHeight + 20,
      horizontalAlignment === 'left' ? 0 : global.config.cameraWidth,
      horizontalAlignment
    );
  }

  public static writeMainMessage(message: string, textFillColor: string = defaultTextFillColor, textStrokeColor: string = defaultTextStrokeColor) {
    const x = global.config.cameraWidth / 2;
    const y = global.config.cameraHeight / 2;
    global.finalCanvas.write(
      message,
      textFillColor, textStrokeColor,
      40, y, x
    );
  }

  public static writeSubMessage(message: string, textFillColor: string = defaultTextFillColor, textStrokeColor: string = defaultTextStrokeColor) {
    global.finalCanvas.write(
      message,
      textFillColor,
      textStrokeColor,
      20, 320
    );
  }

  public static clearStatusBar() {
    global.finalCanvas.clearRect(
      0,
      global.config.cameraHeight,
      global.config.cameraWidth,
      global.config.unit + global.config.cameraHeight,
    )
  }
};
