import { SoundController } from './sound-controller.js';
import { repository } from './repository.js';

const audio = new SoundController('asset/nc79078.mp3');

export const Pingo = {
  props: {
    numbers: Array,
    initialSelectedCount: Number,
  },
  template: `
    <div class="app">
      <div class="current-number">{{ currentNumber | formatNumber }}</div>
      <div class="button-container">
        <button v-if="!started" @click="start" class="spin start">Start</button>
        <button v-else @click="stop" class="spin stop">Stop</button>
      </div>
      <div class="history-container">
        <div v-for="n in maxNumber" :class="historyClass(n)">
          {{ n | formatNumber }}
        </div>
      </div>
      <div class="button-container">
        <button @click="resetWithConfirm" class="reset">Reset</button>
      </div>
    </div>
  `,
  data() {
    return {
      currentNumberIndex: -1,
      started: false,
      selectedCount: this.initialSelectedCount,
    };
  },
  computed: {
    currentNumber() {
      const i = this.currentNumberIndex;
      return i >= 0 && i < this.numbers.length ? this.numbers[i] : 0;
    },
    selectedNumbers() {
      return this.numbers.slice(0, this.selectedCount);
    },
    maxNumber() {
      return this.numbers.length;
    },
  },
  methods: {
    rouletto() {
      if (this.started) {
        this.currentNumberIndex = _.random(
          this.selectedCount,
          this.numbers.length - 1
        );
        setTimeout(() => this.rouletto(), 60);
      }
    },
    start() {
      this.started = true;
      audio.play();
      this.rouletto();
    },
    stop() {
      this.started = false;
      audio.stop();
      this.currentNumberIndex = this.selectedCount;
      this.selectedCount++;
      repository.save({
        numbers: this.numbers,
        selectedCount: this.selectedCount,
      });
    },
    reset() {
      this.started = false;
      audio.stop();
      this.currentNumberIndex = -1;
      const numbers = _.shuffle(this.numbers);
      const selectedCount = 0;
      repository.save({
        numbers,
        selectedCount,
      });
      this.numbers = numbers;
      this.selectedCount = selectedCount;
    },
    resetWithConfirm() {
      if (confirm('Do you really want to reset?')) {
        this.reset();
      }
    },
    historyClass(n) {
      let classNames = ['history'];
      if (this.selectedNumbers.includes(n)) {
        classNames.push('active');
      }
      return classNames;
    },
  },
  filters: {
    formatNumber(n) {
      return _.padStart((n || 0).toString(), 2, '0');
    },
  },
};
