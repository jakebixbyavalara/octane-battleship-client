import { buildBoard, populateBoard } from 'octane-battleship-client/utils/board';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * This class manages board state,
 * specifically the location of ships, and where shots have been made
 * It does not manage
 */
export default class Board {
  constructor(options = {}) {
    // console.log(options);
    this.ships = populateBoard(buildBoard(), options.shipMap);
    this.shots = buildBoard();
  }
  @tracked shots = [];
  @tracked ships = [];

  @action
  fire(row, col) {
    let ship = this.ships[row][col];
    let shot = this.shots[row][col];
    // return if we've already fired here
    if (shot) return;
    // sets to 2 for hit, 1 for miss
    this.shots[row][col] = ship + 2;
    // re assign to trigger tracking change
    this.shots = [...this.shots];
    // console.log(ship, shot, ship % 3, this.shots);
  }
}
