import GameModule from './GameModule';

test('GameModule initializes boards correctly', () => {
  let game = GameModule();
  expect(game.getRoundNumber()).toBe(1);
  expect(game.getPlayerBoard()).toEqual(game.getCompBoard());
  expect(game.getPlayerBoard()).toEqual([
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

test('placePlayerShip places ships correctly', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placePlayerShip('Battleship', 2, 1, true);
  game.placePlayerShip('Destroyer', 3, 8, true);
  game.placePlayerShip('Submarine', 7, 4, false);
  game.placePlayerShip('PatrolBoat', 9, 7);
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
});

test('placePlayerShip returns correct value when ship is placed', () => {
  let game = GameModule();
  expect(game.placePlayerShip('Carrier', 0, 0, false)).toBe(true);
  expect(game.placePlayerShip('Battleship', 2, 1, true)).toBe(true);
  expect(game.placePlayerShip('Destroyer', 3, 8, true)).toBe(true);
  expect(game.placePlayerShip('Submarine', 7, 4, false)).toBe(true);
  expect(game.placePlayerShip('PatrolBoat', 9, 7)).toBe(true);
});

test('placePlayerShip returns correct value when ship is not placed', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  expect(game.placePlayerShip('Carrier', 3, 3, false)).toBe(false);
  expect(game.placePlayerShip('Battleship', 7, 4, true)).toBe(false);
  expect(game.placePlayerShip('Ship', 2, 2, true)).toBe(false);
});

test('placeAllCompShips functions correctly', () => {
  let game = GameModule();
  game.placeAllCompShips();
  expect(game.getCompBoard()).not.toEqual([
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

test('playerAttack correctly registers on opponent board', () => {
  let game = GameModule();
  game.playerAttack(0, 0);
  expect(game.getCompBoard()[0]).toContain(-1);
});

test('compAttack registers correctly on player board', () => {
  let game = GameModule();
  game.compAttack();
  expect(game.getPlayerBoard()).not.toEqual([
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

test('compAttack returns attack coordinates', () => {
  let game = GameModule();
  let coordinates = game.compAttack();
  expect(Array.isArray(coordinates)).toBe(true);
  expect(coordinates.length).toBe(2);
  expect(typeof coordinates[0] === 'number').toBe(true);
  expect(coordinates[0] >= 0 && coordinates[0] < 10).toBe(true);
  expect(typeof coordinates[1] === 'number').toBe(true);
  expect(coordinates[1] >= 0 && coordinates[1] < 10).toBe(true);
});

test('increaseRoundNumber correctly increases round Number', () => {
  let game = GameModule();
  expect(game.getRoundNumber()).toBe(1);
  game.increaseRoundNumber();
  expect(game.getRoundNumber()).toBe(2);
  game.increaseRoundNumber();
  expect(game.getRoundNumber()).toBe(3);
});

test('getShipNames returns array with all five shipNames', () => {
  let game = GameModule();
  expect(game.getShipNames()).toEqual([
    'Carrier',
    'Battleship',
    'Destroyer',
    'Submarine',
    'PatrolBoat',
  ]);
});

test('isBoardSetupComplete returns false when playerBoard is not setup', () => {
  let game = GameModule();
  game.placeAllCompShips();
  game.placePlayerShip('Carrier', 1, 1, false);
  expect(game.isBoardSetupComplete()).toBe(false);
});

test('isBoardSetupComplets returns false when compBoard is not setup', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placePlayerShip('Battleship', 2, 1, true);
  game.placePlayerShip('Destroyer', 3, 8, true);
  game.placePlayerShip('Submarine', 7, 4, false);
  game.placePlayerShip('PatrolBoat', 9, 7);
  expect(game.isBoardSetupComplete()).toBe(false);
});

test('isBoardSetupComplete returns true when both board are fully setup', () => {
  let game = GameModule();
  game.placeAllCompShips();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placePlayerShip('Battleship', 2, 1, true);
  game.placePlayerShip('Destroyer', 3, 8, true);
  game.placePlayerShip('Submarine', 7, 4, false);
  game.placePlayerShip('PatrolBoat', 9, 7);
  expect(game.isBoardSetupComplete()).toBe(true);
});

test('isGameOver reports that game is not over correctly', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placeAllCompShips();
  game.playerAttack(0, 0);
  game.compAttack();
  game.playerAttack(0, 1);
  game.compAttack();
  expect(game.isGameOver()).toBe(false);
});

test('getResultsMessage correctly reports player winner', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placeAllCompShips();
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      game.playerAttack(i, j);
    }
  }
  expect(game.isGameOver()).toBe(true);
  expect(game.getResultsMessage()).toBe('Congrats you win!');
});

test('getResultsMessage correctly reports comp winner', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placeAllCompShips();
  for (let i = 0; i < 100; i += 1) game.compAttack();
  expect(game.getPlayerBoard()).toEqual([
    [1, 1, 1, 1, 1, -1, -1, -1, -1, -1],
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
  expect(game.isGameOver()).toBe(true);
  expect(game.getResultsMessage()).toBe('You lose!');
});

test('resetGame resets everything correctly', () => {
  let game = GameModule();
  game.placePlayerShip('Carrier', 0, 0, false);
  game.placeAllCompShips();

  game.playerAttack(0, 0);
  game.playerAttack(1, 1);
  for (let i = 0; i < 100; i += 1) game.compAttack();
  game.increaseRoundNumber();
  expect(game.getRoundNumber()).toBe(2);
  expect(game.isGameOver()).toBe(true);

  game.resetGame();
  expect(game.getRoundNumber()).toBe(1);
  expect(game.getCompBoard()).toEqual([
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
  expect(game.getPlayerBoard()).toEqual(game.getCompBoard());
});
