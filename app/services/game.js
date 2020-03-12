import Service from '@ember/service';
// import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import GameMachine from 'octane-battleship-client/states/game';
import Player from 'octane-battleship-client/classes/player';

export default class GameService extends Service {
  @tracked game;
  constructor() {
    super(...arguments);
    this.newGame();
  }
  get player() {
    return this.game.state.context.player;
  }
  get opponent() {
    return this.game.state.context.opponent;
  }
  get state() {
    return this.game.state;
  }
  get isSetup() {
    return ['started'].includes(this.game.state.value);
  }
  newGame() {
    if (this.game) return;
    this.game = new GameMachine(new Player({ id: 0 }), new Player({ id: 1 }));
    console.log(this.game);
    this.game.machine.send('INIT');
    console.log(this.game.state);
    /*
    shipMap: [
          [2, { x: 9, y: 1 }, 0],
          [3, { x: 4, y: 2 }, 0],
          [3, { x: 2, y: 0 }],
          [4, { x: 1, y: 5 }, 0],
          [5, { x: 4, y: 8 }]
        ]
        */
  }
}
