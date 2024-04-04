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

test('getShipPlacement returns valid coordinates', () => {
  let player = PlayerFactory();
  let placement = player.getShipPlacement();
  expect(placement.length).toBe(3);
  expect(typeof placement[0]).toBe('number');
  expect(placement[0] >= 0 && placement[0] < 10).toBe(true);
  expect(typeof placement[1]).toBe('number');
  expect(placement[1] >= 0 && placement[1] < 10).toBe(true);
  expect(typeof placement[2]).toBe('boolean');
});
