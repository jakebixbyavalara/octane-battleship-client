The game consists of recording a series of moves and determining if the win condition is met

Display shows player's map with ships and hits, and opponents map with only hits.

A move has the following properties

{
  p: 'playerId'
  g: 'gameId'
  m: 'moveId'
  c: 'coordinates' { x, y }
}

game state gets serailized into a string

2d array, 10 indexes for rows as arrays, containing 10 indexes each

so [0-9][0-9]

each player has a board that is set for them by the opposing player
as each

position ships on board with drag and drop (click to rotate) (rotation will first check if space is available, if not it won't)

game state:
* 2d array serialized into a string
* gets deserialized on load
* each player has 2 boards: ships, shots

game state gets stored in the server
* game id is assigned
* the player gets a board
* each player sets their initial board state
* the initial board gets uploaded and stored
* shots are stored on another board,
  only hits and misses are sent to opposing player
* shots are handled by server (lambda function) and the updated hit map is sent back to the client

turns will require validation:
* only the current player's board updates
* multiple changes will be rejected as cheating
*

Lambda function
* takes: gameid, playerid, state
* gets current ship and shot board states from dynamo
  * query using gameid and playerid
* serialize boards into 2d arrays
* serialize new state into 2d array
* validates new state:
  * only one change (shot signified by x)
* check hit/miss state
  * update shot board with 1 for hit or 2 for miss
* serialize new state for shot board
* save shot board state to dynamo
* return serialized shot state back to client