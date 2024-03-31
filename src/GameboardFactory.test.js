import { getOptError } from 'cli';
import GameBoardFactory from './GameboardFactory.js';

test('Initializes with correct gameboard layout', () => {
  let board = GameBoardFactory();
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeCarrier works correctly(vertically and horizontally)', () => {
  let board = GameBoardFactory();
  board.placeCarrier(1, 2, true);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  board.placeCarrier(6, 5, false);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'Carrier', 'Carrier', 'Carrier', 'Carrier', 'Carrier'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeCarrier throws error when out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.placeCarrier(1, 7, false);
  }).toThrow('Invalid Placement: Out of bounds.');
  expect(() => {
    board.placeCarrier(7, 5, true);
  }).toThrow('Invalid Placement: Out of bounds.');
});

test('placeCarrier throws error when placing over existing ship', () => {
  let board = GameBoardFactory();
  board.placeBattleship(3, 4, true);
  expect(() => {
    board.placeCarrier(5, 2, false);
  }).toThrow('Invalid Placement: Occupied Coordinate.');
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeBattleship works correctly(vertically and horizontally)', () => {
  let board = GameBoardFactory();
  board.placeBattleship(3, 4, true);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  board.placeBattleship(1, 2, false);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Battleship', 'Battleship', 'Battleship', 'Battleship', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Battleship', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeBattleship throws error when out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.placeBattleship(7, 5, true);
  }).toThrow('Invalid Placement: Out of bounds.');
  expect(() => {
    board.placeBattleship(6, 7, false);
  }).toThrow('Invalid Placement: Out of bounds.');
});

test('placeBattleship throws error when placed over existing ship', () => {
  let board = GameBoardFactory();
  board.placeCarrier(5, 2, false);
  expect(() => {
    board.placeBattleship(3, 4, true);
  }).toThrow('Invalid Placement: Occupied Coordinate.');
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Carrier', 'Carrier', 'Carrier', 'Carrier', 'Carrier', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeDestroyer works correctly(vertically and horizontally)', () => {
  let board = GameBoardFactory();
  board.placeDestroyer(6, 9, true);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  board.placeDestroyer(0, 2, false);
  expect(board.getGameboard()).toEqual([
    [0, 0, 'Destroyer', 'Destroyer', 'Destroyer', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeDestroyer throws error when out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.placeDestroyer(8, 1, true);
  }).toThrow('Invalid Placement: Out of bounds.');
  expect(() => {
    board.placeDestroyer(0, 9, false);
  }).toThrow('Invalid Placement: Out of bounds.');
});

test('placeDestroyer throws error when placed over existing ship', () => {
  let board = GameBoardFactory();
  board.placeBattleship(5, 2, false);
  expect(() => {
    board.placeDestroyer(3, 4, true);
  }).toThrow('Invalid Placement: Occupied Coordinate.');
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Battleship', 'Battleship', 'Battleship', 'Battleship', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeSubmarine works correctly(vertically and horizontally)', () => {
  let board = GameBoardFactory();
  board.placeSubmarine(3, 2, true);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  board.placeSubmarine(6, 5, false);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'Submarine', 'Submarine', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placeSubmarine throws error when out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.placeSubmarine(9, 1, true);
  }).toThrow('Invalid Placement: Out of bounds.');
  expect(() => {
    board.placeSubmarine(2, 9, false);
  }).toThrow('Invalid Placement: Out of bounds.');
});

test('placeSubmarine throws error when place over existing ship', () => {
  let board = GameBoardFactory();
  board.placeDestroyer(6, 9, true);
  expect(() => {
    board.placeSubmarine(7, 8, false);
  }).toThrow('Invalid Placement: Occupied Coordinate.');
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 'Destroyer'],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placePatrolBoat works correctly(no orientation needed)', () => {
  let board = GameBoardFactory();
  board.placePatrolBoat(3, 5);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'PatrolBoat', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('placePatrolBoat throws error when out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.placePatrolBoat(10, 0);
  }).toThrow('Invalid Placement: Out of bounds.');
  expect(() => {
    board.placePatrolBoat(3, 10);
  }).toThrow('Invalid Placement: Out of bounds.');
});

test('placePatrolBoat throws error when place over existing ship', () => {
  let board = GameBoardFactory();
  board.placeSubmarine(3, 2, true);
  expect(() => {
    board.placePatrolBoat(4, 2);
  }).toThrow('Invalid Placement: Occupied Coordinate.');
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 'Submarine', 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('receiveAttack records a miss correctly', () => {
  let board = GameBoardFactory();
  board.placeDestroyer(3, 4, false);
  board.receiveAttack(5, 6);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Destroyer', 'Destroyer', 'Destroyer', 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, -1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('receiveAttack records a hit correctly', () => {
  let board = GameBoardFactory();
  board.placeBattleship(2, 5, true);
  board.receiveAttack(4, 5);
  expect(board.getGameboard()).toEqual([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'Battleship', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'Battleship', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 'Battleship', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
});

test('receiveAttack throws error when coordinates are out of bounds', () => {
  let board = GameBoardFactory();
  expect(() => {
    board.receiveAttack(11, 2);
  }).toThrow('Invalid Attack: Out of bounds.');
  expect(() => {
    board.receiveAttack(4, 10);
  }).toThrow('Invalid Attack: Out of bounds.');
});

test('haveAllShipsSunk reports that ships are remaining correctly', () => {
  let board = GameBoardFactory();
  board.placeCarrier(2, 4, false);
  expect(board.haveAllShipsSunk()).toBe(false);
});

test('haveAllShipsSunk reports that all ships have sunk correctly', () => {
  let board = GameBoardFactory();
  board.placePatrolBoat(4, 3);
  board.receiveAttack(4, 3);
  expect(board.haveAllShipsSunk()).toBe(true);
});
