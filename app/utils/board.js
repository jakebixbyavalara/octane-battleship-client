export function buildBoard(size = 10) {
  return [...Array(size)].map(() => {
    return [...Array(size)].map(() => 0);
  });
}
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
export function placeShip(board, size, coords, orientation = 1) {
  // orientation determines direction to move from start coord
  let yDir = orientation ? 0 : 1;
  let xDir = orientation ? 1 : 0;
  try {
    for (let i = 1; i <= size; i++) {
      let row = coords.y - yDir + i * yDir;
      let col = coords.x - xDir + i * xDir;
      if (board[row][col])
        throw new Error(
          `Cannot place a ${orientation ? 'horizontal' : 'vertical'} ${size} square ship at ${
            coords.x
          }, ${coords.y}, as ${row}, ${col} is an occupied space.`
        );
      if (typeof board[row][col] === 'undefined')
        throw new Error(
          `Cannot place ship at ${coords.x}, ${coords.y}, because it does not fit the constraints of the map.`
        );
      // set to 1 to represent ship
      board[row][col] = 1;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
  return board;
}

export default {
  buildBoard,
  populateBoard,
  placeShip
};
