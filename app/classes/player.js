import Board from 'octane-battleship-client/classes/board';
import { action } from '@ember/object';

export default class Player {
  board = null;

  constructor(options = {}) {
    this.id = options.id;
  }

  get hasWon() {
    return this.board.hasWon;
  }
  get isReady() {
    return this.board.isReady;
  }
  @action
  initBoard(options = {}) {
    this.board = new Board(options);
    return this.board;
  }

  @action
  fire(row, col) {
    // call fire action on delegate
    return this.board.fire(row, col);
  }
}
