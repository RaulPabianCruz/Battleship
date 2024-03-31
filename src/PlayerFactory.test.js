import PlayerFactory from './PlayerFactory.js';
import GameboardFactory from './GameboardFactory.js';

test('attackEnemy can make all possible attacks', () => {
  let board = GameboardFactory();
  let player = PlayerFactory();
  for (let i = 0; i < 100; i += 1) {
    let attkCoordinates = player.attackEnemy();
    board.receiveAttack(attkCoordinates[0], attkCoordinates[1]);
  }
  expect(board.getGameboard()).toEqual([
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  ]);
});
