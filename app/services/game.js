import Service from '@ember/service';
// import { action } from '@ember/object';
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
}
