import { buildBoard, populateBoard } from 'octane-battleship-client/utils/board';
import { tracked } from '@glimmer/tracking';
export default class Board {
  constructor(options = {}) {
    // console.log(options);
    this.ships = populateBoard(buildBoard(), options.shipMap);
    this.shots = buildBoard();
  }
  @tracked shots = [];
  @tracked ships = [];
}
