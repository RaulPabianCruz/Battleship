import shipFactory from './shipFactory.js';

function GameBoardFactory() {
  let gameBoard;
  let shipList = new Map();

  function intializeBoard() {
    let tempBoard = new Array(10);
    for (let i = 0; i < 10; i += 1) {
      tempBoard[i] = new Array(10);
      for (let j = 0; j < 10; j += 1) {
        tempBoard[i][j] = 0;
      }
    }
    return tempBoard;
  }

  function isOutOfBounds(coor1, coor2, boardLength) {
    return (
      coor1 < 0 || coor1 >= boardLength || coor2 < 0 || coor2 >= boardLength
    );
  }

  function placeHorizontalShip(coor1, coor2, shipName, size, board) {
    if (
      coor2 + size > board[coor1].length ||
      isOutOfBounds(coor1, coor2, board.length)
    )
      throw new Error('Invalid Placement: Out of bounds.');

    for (let i = 0; i < size; i += 1) {
      if (board[coor1][coor2 + i] !== 0)
        throw new Error('Invalid Placement: Occupied Coordinate.');
    }

    for (let i = 0; i < size; i += 1) board[coor1][coor2 + i] = shipName;
  }

  function placeVerticalShip(coor1, coor2, shipName, size, board) {
    if (
      coor1 + size > board.length ||
      isOutOfBounds(coor1, coor2, board.length)
    )
      throw new Error('Invalid Placement: Out of bounds.');

    for (let i = 0; i < size; i += 1) {
      if (board[coor1 + i][coor2] !== 0)
        throw new Error('Invalid Placement: Occupied Coordinate.');
    }

    for (let i = 0; i < size; i += 1) board[coor1 + i][coor2] = shipName;
  }

  function placeCarrier(coor1, coor2, isVertical) {
    if (isVertical) placeVerticalShip(coor1, coor2, 'Carrier', 5, gameBoard);
    else placeHorizontalShip(coor1, coor2, 'Carrier', 5, gameBoard);
    shipList.set('Carrier', shipFactory(5));
  }

  function placeBattleship(coor1, coor2, isVertical) {
    if (isVertical) placeVerticalShip(coor1, coor2, 'Battleship', 4, gameBoard);
    else placeHorizontalShip(coor1, coor2, 'Battleship', 4, gameBoard);
    shipList.set('Battleship', shipFactory(4));
  }

  function placeDestroyer(coor1, coor2, isVertical) {
    if (isVertical) placeVerticalShip(coor1, coor2, 'Destroyer', 3, gameBoard);
    else placeHorizontalShip(coor1, coor2, 'Destroyer', 3, gameBoard);
    shipList.set('Destroyer', shipFactory(3));
  }

  function placeSubmarine(coor1, coor2, isVertical) {
    if (isVertical) placeVerticalShip(coor1, coor2, 'Submarine', 2, gameBoard);
    else placeHorizontalShip(coor1, coor2, 'Submarine', 2, gameBoard);
    shipList.set('Submarine', shipFactory(2));
  }

  function placePatrolBoat(coor1, coor2) {
    placeVerticalShip(coor1, coor2, 'PatrolBoat', 1, gameBoard);
    shipList.set('PatrolBoat', shipFactory(1));
  }

  function receiveAttack(coor1, coor2) {
    if (isOutOfBounds(coor1, coor2, gameBoard.length))
      throw new Error('Invalid Attack: Out of bounds.');

    if (typeof gameBoard[coor1][coor2] === 'string') {
      let shipName = gameBoard[coor1][coor2];
      let ship = shipList.get(shipName);
      ship.hit();
      if (ship.isSunk()) shipList.delete(shipName);
      gameBoard[coor1][coor2] = 1;
    }

    if (gameBoard[coor1][coor2] === 0) gameBoard[coor1][coor2] = -1;
  }

  function haveAllShipsSunk() {
    return shipList.size === 0;
  }

  function copyBoard(originalBoard) {
    let tempBoard = new Array(originalBoard.length);
    for (let i = 0; i < originalBoard.length; i += 1) {
      tempBoard[i] = new Array(originalBoard[i].length);
      for (let j = 0; j < originalBoard[i].length; j += 1)
        tempBoard[i][j] = originalBoard[i][j];
    }
    return tempBoard;
  }

  function getGameboard() {
    return copyBoard(gameBoard);
  }

  gameBoard = intializeBoard();

  return {
    placeCarrier,
    placeBattleship,
    placeDestroyer,
    placeSubmarine,
    placePatrolBoat,
    receiveAttack,
    haveAllShipsSunk,
    getGameboard,
  };
}

export default GameBoardFactory;
