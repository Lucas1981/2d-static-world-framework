/* NOTE: This is a .js file because TypeScript doesn't like the window object */

const channels = 4;

export default class Sound {

  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || {};
    this.index = 0;
    this.sources = {};
    this.buffers = new Array(channels);
    for (let i = 0; i < this.buffers.length; i++) this.buffers[i] = new Audio();
  }

  play(name) {
    this.buffers[this.index].src = this.sources[name].src;
    this.buffers[this.index].play();
    this.index = (this.index + 1) % this.buffers.length;
  }

  registerSample(key, data) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = data;
      this.sources[key] = audio;
      audio.oncanplaythrough = resolve;
    });
  }
}
