import Vue from '../assets/vue-2.6.10.esm.browser.min.js';
import { Pingo } from './pingo.js';
import { repository } from './repository.js';

export function parseParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    maxNumber: parseInt(params.get('max'), 10) || 75,
  };
}

export class App {
  constructor({ maxNumber } = {}) {
    console.log('config', {
      maxNumber,
    });
    const hiraganaList = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'];
    let { numbers, strings, selectedCount } = repository.load() || {};
    if (
      !Array.isArray(numbers, selectedCount) ||
      numbers.length !== maxNumber ||
      typeof selectedCount !== 'number'
    ) {
      strings = _.shuffle(hiraganaList);
      numbers = _.shuffle(_.range(1, maxNumber + 1));
      selectedCount = 0;
    }

    const vm = new Vue({
      el: '#app',
      data: {
        strings,
        numbers,
        selectedCount,
      },
      components: {
        Pingo,
      },
      template: `
        <pingo
          ref="pingo"
          :strings="strings"
          :numbers="numbers"
          :initialSelectedCount="selectedCount"
        />
      `,
    });
    const { pingo } = vm.$refs;

    window.addEventListener('keydown', e => {
      e.preventDefault();
      if (e.code === 'Space' && !e.repeat) {
        pingo.toggle();
      }
    });
  }
}
