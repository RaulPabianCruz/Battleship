import GameBoardFactory from './GameboardFactory';
import PlayerFactory from './PlayerFactory';

function GameModule() {
  let playerBoard;
  let compBoard;
  let comp;
  let playerTurn = true;

  function initializeGame() {
    comp = PlayerFactory();
    playerBoard = GameBoardFactory();
    compBoard = GameBoardFactory();
    playerTurn = true;
  }

  //temporary stop gap on this function
  function placeShips() {
    playerBoard.placeCarrier(0, 0, false);
    playerBoard.placeBattleship(2, 1, true);
    playerBoard.placeDestroyer(3, 8, true);
    playerBoard.placeSubmarine(7, 4, false);
    playerBoard.placePatrolBoat(9, 7);

    compBoard.placeCarrier(0, 0, false);
    compBoard.placeBattleship(2, 1, true);
    compBoard.placeDestroyer(3, 8, true);
    compBoard.placeSubmarine(7, 4, false);
    compBoard.placePatrolBoat(9, 7);
  }

  function togglePlayerTurn() {
    playerTurn = !playerTurn;
  }

  function isPlayerTurn() {
    return playerTurn;
  }

  function compAttack() {
    let attackCoors = comp.attackEnemy();
    playerBoard.receiveAttack(attackCoors[0], attackCoors[1]);
    togglePlayerTurn();
  }

  function playerAttack(coor1, coor2) {
    compBoard.receiveAttack(coor1, coor2);
    togglePlayerTurn();
  }

  function getPlayerBoard() {
    return playerBoard.getGameboard();
  }

  function getCompBoard() {
    return compBoard.getGameboard();
  }

  function isGameOver() {
    return playerBoard.haveAllShipsSunk() || compBoard.haveAllShipsSunk();
  }

  function getResultsMessage() {
    if (isGameOver()) {
      if (compBoard.haveAllShipsSunk()) return 'Congrats you win!';
      return 'You lose!';
    }
    return undefined;
  }

  initializeGame();
  return {
    placeShips,
    isPlayerTurn,
    getPlayerBoard,
    getCompBoard,
    playerAttack,
    compAttack,
    isGameOver,
    getResultsMessage,
  };
}

export default GameModule;
