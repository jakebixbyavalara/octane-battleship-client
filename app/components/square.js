import Component from '@glimmer/component';

export default class SquareComponent extends Component {
  displayStates = ['bg-blue-300', 'bg-gray-400', 'bg-white', 'bg-red-500'];

  get showShips() {
    return typeof this.args.showShips === 'undefined' ? true : this.args.showShips;
  }
  get state() {
    // currently using tracked game.boards
    // but we may want to find a different way to prevent cheating
    const shot = this.args.shots[this.args.row][this.args.col];
    const ship = this.args.ships && this.args.ships[this.args.row][this.args.col];
    let state = shot;
    if (this.showShips) {
      if (ship) {
        if (!shot) {
          state = ship;
        }
      }
    }
    return state;
    // return this.showShips ? (ship ? (shot ? shot : ship) : shot) : shot;
  }
  get background() {
    return this.displayStates[this.state];
  }

  get isFired() {
    return this.state > 1;
  }
}
