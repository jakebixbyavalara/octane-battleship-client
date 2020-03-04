import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class BoardComponent extends Component {
  @service('game') game;
  DEFAULT_SIZE = 10;

  get size() {
    return this.args.size || this.DEFAULT_SIZE;
  }
  getLetterByIndex(index) {
    return String.fromCharCode(65 + index); // charCode 65 = 'A'
  }
  get player() {
    return this.game.players[this.args.player];
  }
  get rows() {
    return [...Array(this.size)].map((_, index) => this.getLetterByIndex(index));
  }
  get cols() {
    return [...Array(this.size)].map((_, index) => index + 1);
  }
}
