import Board from 'octane-battleship-client/classes/board';
import { action } from '@ember/object';

export default class Player {
  constructor(options = {}) {
    this.id = options.id;
    this.board = new Board(options);
  }
  @action
  fire(row, col) {
    // call fire action on delegate
    return this.board.fire(row, col);
  }
}
