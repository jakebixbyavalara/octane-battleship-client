import Board from 'octane-battleship-client/delegates/board';
import { action } from '@ember/object';

export default class Player {
  constructor(options = {}) {
    this.id = options.id;
    this.board = new Board(options);
  }
  @action
  fire(row, col) {
    return this.board.fire(row, col);
  }
}
