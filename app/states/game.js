import { Machine, interpret, assign } from 'xstate';

export default class GameMachine {
  constructor(player, opponent) {
    this.machine = interpret(
      Machine(
        {
          id: 'game',
          initial: 'new',
          context: {
            player, // player class instance
            opponent, // player class instance
            last: null // last player to move
          },
          states: {
            new: {
              on: {
                INIT: {
                  target: 'setup',
                  actions: ['initBoards']
                }
              }
            },
            setup: {
              on: {
                PLAYER_READY: {
                  target: 'started',
                  cond: 'playersAreReady'
                }
              }
            },
            started: {},
            ended: {}
          }
        },
        {
          guards: {
            playerHasWon: ({ player, opponent }) => {
              return player.hasWon || opponent.hasWon;
            },
            playersAreReady: (context, event) => {
              const { player, opponent } = context;
              console.log(context, event);
              console.log('checking players ready', player.isReady, opponent.isReady);
              return player.isReady && opponent.isReady;
            }
          },
          actions: {
            initBoards: ({ player, opponent }) => {
              player.initBoard();
              opponent.initBoard();
            }
          }
        }
      )
    );
    this.machine.start();
  }

  get state() {
    return this.machine.state;
  }
}
