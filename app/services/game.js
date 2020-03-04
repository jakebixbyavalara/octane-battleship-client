import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Player from 'octane-battleship-client/classes/player';

export default class GameService extends Service {
  constructor() {
    super(...arguments);
    this.players = [
      new Player({ id: 0 }),
      new Player({
        id: 1,
        shipMap: [
          [2, { x: 9, y: 1 }, 0],
          [3, { x: 4, y: 2 }, 0],
          [3, { x: 2, y: 0 }],
          [4, { x: 1, y: 5 }, 0],
          [5, { x: 4, y: 8 }]
        ]
      })
    ];
    // console.log(this.players);
  }

  @tracked players = [];

  @action
  fire(player, row, col) {
    let ship = this.players[player].ships[row][col];
    let shot = this.players[player].shots[row][col];
    // return if we've already fired here
    if (shot) return;
    // sets to 2 for hit, 1 for miss
    this.players[player].shots[row][col] = ship + 2;
    this.players[player].shots = [...this.players[player].shots];
    // console.log(ship, shot, ship % 3, this.shots);
  }
}
