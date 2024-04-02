import GameModule from './GameModule';

test('GameModule initializes boards correctly', () => {
  let game = GameModule();
  game.placeShips();
  expect(game.getPlayerBoard()).toEqual([
    ['Carrier', 'Carrier', 'Carrier', 'Carrier', 'Carrier', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Submarine', 'Submarine', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 'PatrolBoat', 0, 0],
  ]);
  expect(game.getCompBoard()).toEqual([
    ['Carrier', 'Carrier', 'Carrier', 'Carrier', 'Carrier', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Submarine', 'Submarine', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 'PatrolBoat', 0, 0],
  ]);
});

test('GameModule initializes with player as the first turn', () => {
  let game = GameModule();
  expect(game.isPlayerTurn()).toBe(true);
});

test('playerAttack correctly registers on opponent board', () => {
  let game = GameModule();
  game.placeShips();
  game.playerAttack(0, 0);
  expect(game.getCompBoard()).toEqual([
    [1, 'Carrier', 'Carrier', 'Carrier', 'Carrier', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Submarine', 'Submarine', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 'PatrolBoat', 0, 0],
  ]);
});

test('playerAttack correctly switches turns', () => {
  let game = GameModule();
  game.placeShips();
  game.playerAttack(0, 0);
  expect(game.isPlayerTurn()).toBe(false);
});

test('compAttack registers correctly on player board', () => {
  let game = GameModule();
  game.placeShips();
  game.playerAttack(0, 0);
  game.compAttack();
  expect(game.getPlayerBoard()).not.toEqual([
    ['Carrier', 'Carrier', 'Carrier', 'Carrier', 'Carrier', 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 'Battleship', 0, 0, 0, 0, 0, 0, 'Destroyer', 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 'Submarine', 'Submarine', 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 'PatrolBoat', 0, 0],
  ]);
});

test('compAttack correctly switches turns', () => {
  let game = GameModule();
  game.placeShips();
  game.playerAttack(0, 0);
  game.compAttack();
  expect(game.isPlayerTurn()).toBe(true);
});

test('isGameOver reports that game is not over correctly', () => {
  let game = GameModule();
  game.placeShips();
  game.playerAttack(0, 0);
  game.compAttack();
  game.playerAttack(0, 1);
  game.compAttack();
  expect(game.isGameOver()).toBe(false);
});

test('getResultsMessage correctly reports player winner', () => {
  let game = GameModule();
  game.placeShips();
  let attackCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [3, 8],
    [4, 8],
    [5, 8],
    [7, 4],
    [7, 5],
    [9, 7],
  ];
  for (let i = 0; i < attackCoordinates.length; i += 1) {
    let coor1 = attackCoordinates[i][0];
    let coor2 = attackCoordinates[i][1];
    game.playerAttack(coor1, coor2);
  }
  expect(game.getCompBoard()).toEqual([
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  ]);
  expect(game.isGameOver()).toBe(true);
  expect(game.getResultsMessage()).toBe('Congrats you win!');
});

test('getResultsMessage correctly reports comp winner', () => {
  let game = GameModule();
  game.placeShips();
  for (let i = 0; i < 100; i += 1) game.compAttack();
  expect(game.getPlayerBoard()).toEqual([
    [1, 1, 1, 1, 1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1, -1, -1, -1, 1, -1],
    [-1, 1, -1, -1, -1, -1, -1, -1, 1, -1],
    [-1, 1, -1, -1, -1, -1, -1, -1, 1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
  ]);
  expect(game.isGameOver()).toBe(true);
  expect(game.getResultsMessage()).toBe('You lose!');
});
