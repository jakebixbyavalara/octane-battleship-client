import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

const DEFAULT_SIZE = 10;
export default class BoardComponent extends Component {
  @service('game') game;
  @tracked selectedShip = null;
  @tracked _ships = null;

  constructor() {
    super(...arguments);
    this._ships = {
      patrol: { name: 'patrol', size: 2, horizontal: false, isPlaced: false },
      submarine: { name: 'submarine', size: 3, horizonatal: false, isPlaced: false },
      destroyer: { name: 'destroyer', size: 3, horizontal: false, isPlaced: false },
      battleship: { name: 'battleship', size: 4, horizonatal: false, isPlaced: false },
      carrier: { name: 'carrier', size: 5, horizonatal: false, isPlaced: false }
    };
  }
  get shipList() {
    return Object.values(this._ships);
  }
  get allPlaced() {
    return !Object.values(this._ships).filter((ship) => !ship.isPlaced).length;
  }
  get size() {
    return this.args.size || DEFAULT_SIZE;
  }
  getLetterByIndex(index) {
    return String.fromCharCode(65 + index); // charCode 65 = 'A'
  }
  get player() {
    return this.args.player;
  }
  get rows() {
    return [...Array(this.size)].map((_, index) => this.getLetterByIndex(index));
  }
  get cols() {
    return [...Array(this.size)].map((_, index) => index + 1);
  }

  @action
  selectShip(ship) {
    this.selectedShip = { ...ship };
    // console.log('select', this.selectedShip);
  }
  @action
  placeShip(ship, col, row) {
    // console.log('placing', ship);
    const isPlaced = this.player.board.placeShip(ship, col, row);
    console.log(isPlaced, ship);
    if (!isPlaced) return;
    this._ships[ship.name] = { ...ship, isPlaced: true };
    this._ships = { ...this._ships };
    this.selectedShip = { ...this._ships[ship.name] };
    if (this.allPlaced) this.game.game.machine.send('PLAYER_READY');
  }
  @action
  toggleShipOrientation(ship) {
    if (ship.isPlaced) return;
    const orientation = !ship.horizontal;
    this._ships[ship.name] = { ...ship, horizontal: orientation };
    this._ships = { ...this._ships };
    this.selectedShip = { ...this._ships[ship.name] };
    // console.log(this._ships[ship.name], ship.orientation, orientation, this.shipList);
  }
}
