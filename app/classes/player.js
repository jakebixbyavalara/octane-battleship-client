import Board from 'octane-battleship-client/classes/board';
import { action } from '@ember/object';

export default class Player {
  constructor(options = {}) {
    this.id = options.id;
    this.board = new Board(options);
  }
  @action
  fire(row, col) {
    let ship = this.board.ships[row][col];
    let shot = this.board.shots[row][col];
    // return if we've already fired here
    if (shot) return;
    // sets to 2 for hit, 1 for miss
    this.board.shots[row][col] = ship + 2;
    // re assign to trigger tracking change
    this.board.shots = [...this.board.shots];
    // console.log(ship, shot, ship % 3, this.shots);
  }
}
