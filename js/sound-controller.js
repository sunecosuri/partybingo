export class SoundController {
  constructor(drumRollSrc, cymbalSrc) {
    this.drumRollAudio = new Audio(drumRollSrc);
    this.cymbalAudio = new Audio(cymbalSrc);
    this.onEnded = null;
    this.drumRollAudio.addEventListener('ended', () => {
      if (!this.onEnded) {
        return;
      }
      this.onEnded();
    });
  }
  play() {
    this.drumRollAudio.play();
  }
  stop() {
    this.stopWithoutSound();
    this.cymbalAudio.play();
  }
  stopWithoutSound() {
    this.drumRollAudio.pause();
    this.drumRollAudio.currentTime = 0;
  }
  setOnEnded(onEnded) {
    this.onEnded = onEnded;
  }
}
