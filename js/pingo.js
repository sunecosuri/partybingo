import { SoundController } from './sound-controller.js';
import { repository } from './repository.js';

const audio = new SoundController(
  'assets/se_maoudamashii_instruments_drumroll.ogg',
  'assets/se_maoudamashii_instruments_drum1_cymbal.ogg'
);

export const Pingo = {
  props: {
    numbers: Array,
    strings: Array,
    initialSelectedCount: Number,
  },
  template: `
    <div class="app">
    <div :class="currentNumberClass">{{ currentString || '　　' }}</div>
    <div class="button-container">
        <button v-if="!started" @click="start" class="spin start">Start</button>
        <button v-else @click="stop(false)" class="spin stop">Stop</button>
      </div>
      <div class="history-container">
        <li v-if="hiraganaList[i].length > 0" v-for="(n, i) in hiraganaList" :class="historyClass(i)">
          {{ hiraganaList[i] }}
        </li>
        <li v-else>
        </li>
      </div>
      <div class="button-container">
        <button @click="resetWithConfirm" class="reset">Reset</button>
      </div>
    </div>
  `,
  data() {
    return {
      hiraganaList: ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','ら','り','る','れ','ろ','や','', 'ゆ','','よ','わ','','を','','ん'],
      currentIndex: undefined,
      started: false,
      selectedCount: this.initialSelectedCount,
    };
  },
  computed: {
    currentString() {
      const i = this.currentIndex;
      return this.strings[i];
    },
    selectedStrings() {
      return this.strings.slice(0, this.selectedCount);
    },
    stringList() {
      return this.strings;
    },
    currentNumberClass() {
      let classNames = ['current-number'];
      if (!this.started) {
        classNames.push('active');
      }
      return classNames;
    },
  },
  methods: {
    rouletto() {
      if (this.started) {
        this.currentIndex = _.random(
          this.selectedCount,
          this.strings.length - 1
        );
        setTimeout(() => this.rouletto(), 60);
      }
    },
    start() {
      this.started = true;
      audio.play();
      this.rouletto();
    },
    stop(withoutSound) {
      this.started = false;
      if (withoutSound) {
        audio.stopWithoutSound();
      } else {
        audio.stop();
      }
      this.currentIndex = this.selectedCount;
      this.selectedCount++;
      repository.save({
        strings: this.strings,
        selectedCount: this.selectedCount,
      });
    },
    toggle() {
      if (!this.started) {
        this.start();
      } else {
        this.stop();
      }
    },
    reset() {
      this.started = false;
      audio.stopWithoutSound();
      this.currentIndex = -1;
      const strings = _.shuffle(this.strings);
      const selectedCount = 0;
      repository.save({
        strings,
        selectedCount,
      });
      this.selectedCount = selectedCount;
    },
    resetWithConfirm() {
      if (confirm('Do you really want to reset?')) {
        this.reset();
      }
    },
    historyClass(n) {
      let classNames = ['history'];
      if (this.selectedStrings.includes(this.hiraganaList[n]) || this.select) {
        classNames.push('active');
      }
      return classNames;
    },
    formatNumber(n) {
      let padWidth = 0;
      let m = this.maxNumber;
      for (; m >= 1; padWidth++) {
        m /= 10;
      }
      return _.padStart((n || 0).toString(), padWidth, '0');
    },
  },
  created() {
    audio.setOnEnded(() => {
      this.stop(true);
    });
  },
};
