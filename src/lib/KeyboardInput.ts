const keyLeft: number = 37;
const keyUp: number = 38;
const keyRight: number = 39;
const keyDown: number = 40;
const keySpace: number = 32; // space

const a: number = 65; // a
const d: number = 68; // d
const w: number = 87; // w
const s: number = 83; // s
const y: number = 89; // y
const n: number = 78; // n
const enter: number = 13; // enter
const escape: number = 27; // escape
const zero: number = 48; // 0

const myTimer: number = 40; // 40 ms

const state: any = {
  up: false,
  down: false,
  left: false,
  right: false,
  altUp: false,
  altDown: false,
  altLeft: false,
  altRight: false,
  z: false,
  x: false,
  yes: false,
  no: false,
  space: false,
  toggle: false,
  suicide: false,
  enter: false,
  zero: false,
  escape: false
};

export default class KeyboardInput {

  constructor() {
    document.addEventListener('keydown', KeyboardInput.keyDownFunction);
    document.addEventListener('keyup', KeyboardInput.keyUpFunction);
  }

  public get state() {
    return state;
  }

  public reset() {
    Object.keys(state).forEach(key => state[key] = false);
  }

  public destructor() {
    document.removeEventListener('keydown', KeyboardInput.keyDownFunction);
    document.removeEventListener('keyup', KeyboardInput.keyUpFunction);
  }

  private static keyDownFunction(e: any) {

    const release: any = e;

    switch(release.keyCode) {
      case keyUp:
        state.up = true;
        break;
      case keyDown:
        state.down = true;
        break;
      case keyLeft:
        state.left = true;
        break;
      case keyRight:
        state.right = true;
        break;
      case keySpace:
        state.space = true;
        break;
      case w:
        state.altUp = true;
        break;
      case s:
        state.altDown = true;
        break;
      case a:
        state.altLeft = true;
        break;
      case d:
        state.altRight = true;
        break;
      case enter:
        state.enter = true;
        break;
      case zero:
        state.zero = true;
        break;
      case escape:
        state.escape = true;
        break;
      case y:
        state.yes = true;
        break;
      case n:
        state.no = true;
        break;
      default:
        break;
    }
  }

  private static keyUpFunction(e: any) {

    const release: any = e;

    switch(release.keyCode) {
      case keyUp:
        state.up = false;
        break;
      case keyDown:
        state.down = false;
        break;
      case keyLeft:
        state.left = false;
        break;
      case keyRight:
        state.right = false;
        break;
      case keySpace:
        state.space = false;
        break;
      case w:
        state.altUp = false;
        break;
      case s:
        state.altDown = false;
        break;
      case a:
        state.altLeft = false;
        break;
      case d:
        state.altRight = false;
        break;
      case enter:
        state.enter = false;
        break;
      case zero:
        state.zero = false;
        break;
      case escape:
        state.escape = false;
        break;
      case y:
        state.yes = false;
        break;
      case n:
        state.no = false;
        break;
      default:
        break;
    }
  }
};
