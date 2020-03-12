export function buildBoard(size = 10) {
  return [...Array(size)].map(() => {
    return [...Array(size)].map(() => 0);
  });
}
// build out a board using an array of ship arguments for placeShip
export function populateBoard(board, map) {
  // console.log(map);
  let ships = map || [
    [2, { x: 2, y: 1 }],
    [3, { x: 9, y: 2 }, 0],
    [3, { x: 3, y: 3 }, 0],
    [3, { x: 3, y: 3 }, 0],
    [4, { x: 1, y: 5 }, 0],
    [5, { x: 4, y: 8 }]
  ];
  return ships.reduce((acc, values) => placeShip(acc, ...values), board);
}
// gets orientation offset for x and y axis
export function getOrientation(dir) {
  // if we're passing in a string (h or v) convert to bool
  if (typeof dir === 'string') {
    dir = dir === 'h';
  }
  return {
    x: dir ? 1 : 0,
    y: dir ? 0 : 1
  };
}

// compute x and y position using coords and offset
// used for placing ships
export function getPosition(coords = { x: 0, y: 0 }, dir = { x: 1, y: 0 }, offset = 0) {
  return {
    x: coords.x - dir.x + offset * dir.x,
    y: coords.y - dir.y + offset * dir.y
  };
}

// do validation check before actually assigning any ship positions
export function canPlaceShip(board, shipSize, coords, isHorizontal) {
  // orientation determines direction to move from start coord
  let dir = getOrientation(isHorizontal);
  try {
    for (let i = 1; i <= shipSize; i++) {
      let pos = getPosition(coords, dir, i);
      if (board[pos.y][pos.x])
        throw new Error(
          `Cannot place a ${isHorizontal ? 'horizontal' : 'vertical'} ${shipSize} square ship at ${
            coords.x
          }, ${coords.y}, as ${pos.y}, ${pos.x} is an occupied space.`
        );
      if (typeof board[pos.y][pos.x] === 'undefined')
        throw new Error(
          `Cannot place ship at ${coords.x}, ${coords.y}, because it does not fit the constraints of the map.`
        );
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
  return true;
}

// place a ship on a board
// will throw if the position is occupied or out of bounds
export function placeShip(board, shipSize, coords, isHorizontal) {
  // orientation determines direction to move from start coor
  if (canPlaceShip(board, shipSize, coords, isHorizontal)) {
    let dir = getOrientation(isHorizontal);
    for (let i = 1; i <= shipSize; i++) {
      let pos = getPosition(coords, dir, i);
      board[pos.y][pos.x] = 1;
    }
    return board;
  }
  return false;
}

export default {
  buildBoard,
  populateBoard,
  placeShip,
  canPlaceShip,
  getOrientation,
  getPosition
};
