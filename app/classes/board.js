import { buildBoard, placeShip } from 'octane-battleship-client/utils/board';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * This class manages board state,
 * specifically the location of ships, and where shots have been made
 * It provides a fire action to mutate its state
 */
export default class Board {
  constructor() {
    this.ships = buildBoard();
    this.shots = buildBoard();
  }
  @tracked shots = [];
  @tracked ships = [];

  get hasWon() {
    const count = this.shots.flat().reduce((total, shot) => (shot > 2 ? total++ : total), 0);
    return count === 17;
  }
  /**
   * Updates shot board at specified coordinates
   * @param {Number} row
   * @param {Number} col
   */
  @action
  fire(row, col) {
    let ship = this.ships[row][col];
    let shot = this.shots[row][col];
    // return if we've already fired here
    if (shot) return;
    // sets to 3 for hit, 2 for miss
    this.shots[row][col] = ship + 2;
    // re assign to trigger tracking change
    this.shots = [...this.shots];
  }
  @action
  placeShip(ship, row, col) {
    if (ship.isPlaced) return;
    // otherwise place the ship
    const ships = placeShip(this.ships, ship.size, { x: col, y: row }, ship.horizontal);
    if (ships) {
      this.ships = [...ships];
    }
    return ships;
  }
}
