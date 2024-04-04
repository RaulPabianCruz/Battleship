import GameBoardFactory from './GameboardFactory';
import PlayerFactory from './PlayerFactory';

function GameModule() {
  let playerBoard;
  let compBoard;
  let comp;
  let playerTurn;
  let roundNumber;

  function resetGame() {
    comp = PlayerFactory();
    playerBoard = GameBoardFactory();
    compBoard = GameBoardFactory();
    playerTurn = true;
    roundNumber = 1;
  }

  //temporary stop gap on this function
  function placeShips() {
    playerBoard.placeCarrier(0, 0, false);
    playerBoard.placeBattleship(2, 1, true);
    playerBoard.placeDestroyer(3, 8, true);
    playerBoard.placeSubmarine(7, 4, false);
    playerBoard.placePatrolBoat(9, 7);
  }

  function placeCompShip(shipName) {
    let shipIsPlaced = false;
    while (!shipIsPlaced) {
      let coor1, coor2, isVertical;
      [coor1, coor2, isVertical] = comp.getShipPlacement();
      try {
        switch (shipName) {
          case 'Carrier':
            compBoard.placeCarrier(coor1, coor2, isVertical);
            break;
          case 'Battleship':
            compBoard.placeBattleship(coor1, coor2, isVertical);
            break;
          case 'Destroyer':
            compBoard.placeDestroyer(coor1, coor2, isVertical);
            break;
          case 'Submarine':
            compBoard.placeSubmarine(coor1, coor2, isVertical);
            break;
          default:
            compBoard.placePatrolBoat(coor1, coor2);
        }
        shipIsPlaced = true;
      } catch (error) {
        //console.log(`Error placing ${shipName}.`);
      }
    }
  }

  function placeAllCompShips() {
    placeCompShip('Carrier');
    placeCompShip('Battleship');
    placeCompShip('Destroyer');
    placeCompShip('Submarine');
    placeCompShip('PatrolBoat');
  }

  function togglePlayerTurn() {
    playerTurn = !playerTurn;
  }

  function isPlayerTurn() {
    return playerTurn;
  }

  function increaseRoundNumber() {
    roundNumber += 1;
  }

  function getRoundNumber() {
    return roundNumber;
  }

  function compAttack() {
    let attackCoors = comp.attackEnemy();
    playerBoard.receiveAttack(attackCoors[0], attackCoors[1]);
    togglePlayerTurn();
    return attackCoors;
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

  resetGame();
  return {
    resetGame,
    placeShips,
    placeAllCompShips,
    isPlayerTurn,
    increaseRoundNumber,
    getRoundNumber,
    getPlayerBoard,
    getCompBoard,
    playerAttack,
    compAttack,
    isGameOver,
    getResultsMessage,
  };
}

export default GameModule;
