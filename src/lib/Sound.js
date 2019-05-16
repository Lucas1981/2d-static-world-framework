/* NOTE: This is a .js file because TypeScript doesn't like the window object */

const channels = 4;

export default class Sound {

  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || {};
    this.index = 0;
    this.sources = {};
    this.buffers = new Array(channels).fill(new Audio());
  }

  play(name) {
    this.index = (this.index + 1) % this.buffers.length;
    this.buffers[this.index].src = this.buffers[name].src;
    this.buffers[this.index].play();
  }

  registerSample(key, data) {
    const audio = new Audio();
    audio.src = data;
    this.buffers[key] = audio;
  }
}
